import { BelongsToManyOptions, BelongsToOptions, HasManyOptions, HasOneOptions, ModelOptions } from 'sequelize';

export type DataType = 'string' | 'text' | 'enum' | 'uuid' | 'date' | 'time' | 'datetime' | 'timestamp' | 'integer' | 'biginteger' | 'float' | 'decimal' | 'boolean' | 'json';

export type FieldDefinition = {
    type: DataType;
    allowNull?: boolean;
    primaryKey?: boolean;
    defaultValue?: string | number | boolean | null;
    unique?: boolean;
    values?: string[];
    validate?: Record<string, any>;
};

export type RelationDefinition = {
    type: 'hasOne' | 'hasMany' | 'belongsTo' | 'belongsToMany';
    target: string;
    options: HasOneOptions | HasManyOptions | BelongsToOptions | BelongsToManyOptions;
};

export interface ModelDefinition {
    name: string;
    options?: ModelOptions;
    fields: Record<string, FieldDefinition>;
    relations?: RelationDefinition[];
} 