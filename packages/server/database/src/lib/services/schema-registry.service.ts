import { injectable } from 'inversify';
import { ModelService } from './model.service';
import { resolveSequelizeType } from '../utils';
import { ConnectionService } from './connection.service';

import type { IndexesOptions, ModelAttributes } from 'sequelize'; 
import type { SchemaDefinition, SchemaRelationDefinition } from '../types';


/**
 * Service for managing database schemas and model definitions
 */
@injectable()
export class SchemaRegistryService {
    private readonly schemas: SchemaDefinition[] = [];

    constructor(
        private readonly modelService: ModelService,
        private readonly connectionService: ConnectionService
    ) {}

    /**
     * Defines a new schema and adds it to the collection
     * @param schema - The schema definition to add
     */
    async defineSchema(schema: SchemaDefinition) {
        this.schemas.push(schema);
    }

    /**
     * Synchronizes all defined schemas with the database
     * Creates or updates models based on schema definitions
     */
    async sync() {
        for (const schema of this.schemas) {
            const attributes = this.buildModelAttributes(schema);
            const indexes = this.buildModelIndexes(schema);

            this.modelService.defineModel(schema.name, attributes, {
                ...schema.options,
                indexes: indexes as IndexesOptions[]
            });
        }

        for (const schema of this.schemas) {
            const sourceModel =
                this.connectionService.client.models[schema.name];
            for (const [_name, field] of Object.entries(schema.fields)) {
                if (field.type !== 'relation') continue;

                const relationField = field as SchemaRelationDefinition;

                const targetModel = this.connectionService.client.models[relationField.target];
                this.modelService.defineRelations(
                    sourceModel,
                    targetModel,
                    {
                        type: relationField.relationType,
                        target: relationField.target,
                        options: relationField.options
                    }
                );
            }
        }

        await this.connectionService.client.sync({
            alter: true
        });
    }

    /**
     * Builds model attributes from a schema definition
     * @param schema - The schema to build attributes from
     * @returns The built model attributes
     */
    private buildModelAttributes(schema: SchemaDefinition) {
        const attributes: ModelAttributes = {};

        for (const [name, field] of Object.entries(schema.fields)) {
            if (field.type === 'relation') continue;
            
            const type = resolveSequelizeType(field.type, field);

            attributes[name] = {
                type,
                allowNull: field.nullable ?? true,
                primaryKey: field.primaryKey ?? false,
                defaultValue: field.defaultValue ? (typeof field.defaultValue === 'function' ? field.defaultValue() : field.defaultValue) : undefined,
                validate: field.validate ?? undefined
            };
        }

        return attributes;
    }

    /**
     * Builds model indexes from a schema definition
     * @param def - The schema to build indexes from
     * @returns Array of index definitions
     */
    private buildModelIndexes(def: SchemaDefinition) {
        const indexes: { unique: boolean; fields: string[] }[] = [];

        for (const [name, field] of Object.entries(def.fields)) {
            if (field.unique) {
                indexes.push({ unique: true, fields: [name] });
            }
        }

        return [...(def.options?.indexes ?? []), ...indexes];
    }
}
