import { injectable } from "inversify";
import { ModelService } from "./model.service";
import { BelongsToManyOptions, BelongsToOptions, HasManyOptions, HasOneOptions, ModelAttributes, ModelOptions } from "sequelize";
import { resolveSequelizeType } from "../utils";
import { ConnectionService } from "./connection.service";

/**
 * Supported data types for schema fields
 */
export type SchemaDataType = 'string' | 'text' | 'enum' | 'uuid' | 'date' | 'time' | 'datetime' | 'timestamp' | 'integer' | 'biginteger' | 'float' | 'decimal' | 'boolean' | 'json';

/**
 * Definition of a schema field with its properties
 */
export type SchemaFieldDefinition = {
    /** The data type of the field */
    type: SchemaDataType;
    /** Whether this field is a primary key */
    primaryKey?: boolean;
    /** Whether this field can be null */
    nullable?: boolean;
    /** Whether this field must be unique */
    unique?: boolean;
};

/**
 * Definition of a relationship between models
 */
export type SchemaRelationDefinition = {
    /** The type of relationship */
    type: 'hasOne' | 'hasMany' | 'belongsTo' | 'belongsToMany';
    /** The target model name */
    target: string;
    /** The relationship options */
    options: HasOneOptions | HasManyOptions | BelongsToOptions | BelongsToManyOptions;
};

/**
 * Complete schema definition for a model
 */
export type SchemaDefinition = {
    /** The name of the model */
    name: string;
    /** The fields of the model */
    fields: Record<string, SchemaFieldDefinition>;
    /** Optional relationships with other models */
    relations?: SchemaRelationDefinition[];
    /** Additional model options */
    options?: ModelOptions;
};

/**
 * Service for managing database schemas and model definitions
 */
@injectable()
export class SchemaService {
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
                indexes
            });
        }

        for (const schema of this.schemas) {
            const sourceModel = this.connectionService.client.models[schema.name];
            for (const relation of schema.relations ?? []) {
                const targetModel = this.connectionService.client.models[relation.target];
                this.modelService.defineRelations(sourceModel, targetModel, relation);
            }
        }

        this.connectionService.client.sync({
            alter: true,
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
            const type = resolveSequelizeType(field.type, field);
            
            attributes[name] = {
                type,
                allowNull: field.nullable ?? true,
                primaryKey: field.primaryKey ?? false,
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

        return [
            ...(def.options?.indexes ?? []),
            ...indexes,
        ];
    }
}