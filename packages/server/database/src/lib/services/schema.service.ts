import { injectable } from "inversify";
import { ModelService } from "./model.service";
import { BelongsToManyOptions, BelongsToOptions, HasManyOptions, HasOneOptions, ModelAttributes, ModelOptions } from "sequelize";
import { resolveSequelizeType } from "../utils";

export type SchemaDataType = 'string' | 'text' | 'enum' | 'uuid' | 'date' | 'time' | 'datetime' | 'timestamp' | 'integer' | 'biginteger' | 'float' | 'decimal' | 'boolean' | 'json';

export type SchemaFieldDefinition = {
    type: SchemaDataType;
    primaryKey?: boolean;
    nullable?: boolean;
    unique?: boolean;
};

export type SchemaRelationDefinition = {
    type: 'hasOne' | 'hasMany' | 'belongsTo' | 'belongsToMany';
    target: string;
    options: HasOneOptions | HasManyOptions | BelongsToOptions | BelongsToManyOptions;
};


export type SchemaDefinition = {
    name: string;
    fields: Record<string, SchemaFieldDefinition>;
    relations?: SchemaRelationDefinition[];
    options?: ModelOptions;
};

@injectable()
export class SchemaService {
    private readonly schemas: SchemaDefinition[] = [];

    constructor(private readonly modelService: ModelService) {}

    async defineSchema(schema: SchemaDefinition) {
        this.schemas.push(schema)
    }

    async sync() {
        for (const schema of this.schemas) {
            const attributes = this.buildModelAttributes(schema);
            const indexes = this.buildModelIndexes(schema);

            this.modelService.defineModel(schema.name, attributes, {
                ...schema.options,
                indexes
            });
        }
    }

    private buildModelAttributes(schema: SchemaDefinition) {
        const attributes: ModelAttributes = {};

        for (const [name, field] of Object.entries(schema.fields)) {
            const type = resolveSequelizeType(field.type, field);
            
            attributes[name] = {
                type,
                allowNull: field.nullable ?? true,
                primaryKey: field.primaryKey ?? false,
                unique: field.unique ?? false
            };
        }

        return attributes;
    }

    private buildModelIndexes(def: SchemaDefinition): { unique: boolean; fields: string[] }[] {
        const indexes: { unique: boolean; fields: string[] }[] = [];

        for (const [name, field] of Object.entries(def.fields)) {
            if (field.unique) {
                indexes.push({ unique: true, fields: [name] });
            }
        }

        return indexes;
    }
}