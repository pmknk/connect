import { BelongsToManyOptions, BelongsToOptions, CountOptions, CreateOptions, FindOptions, HasManyOptions, HasOneOptions, ModelValidateOptions, Transaction as SequelizeTransaction } from "sequelize";

/**
 * Supported data types for schema fields
 */
export type SchemaDataType =
    | 'string'
    | 'text'
    | 'enum'
    | 'uuid'
    | 'date'
    | 'time'
    | 'datetime'
    | 'timestamp'
    | 'integer'
    | 'biginteger'
    | 'float'
    | 'decimal'
    | 'boolean'
    | 'json'
    | 'relation';

/**
 * Definition of a schema field with its properties
 */
export type SchemaFieldDefinition = {
    type: SchemaDataType;
    primaryKey?: boolean;
    nullable?: boolean;
    unique?: boolean;
    defaultValue?: string | number | boolean | Date | null | (() => string | number | boolean | Date | null);
    values?: string[] | number[];
    validate?: ModelValidateOptions;
} & (
    | {
        type: 'relation';
    } & SchemaRelationDefinition
    | {}
)

/**
 * Definition of a relationship between models
 */
export type SchemaRelationDefinition = {
    relationType: 'hasOne' | 'hasMany' | 'belongsTo' | 'belongsToMany';
    target: string;
    options:
        | HasOneOptions
        | HasManyOptions
        | BelongsToOptions
        | BelongsToManyOptions;
};

export type SchemaIndexDefinition = {
    name?: string;
    fields:
        | string[]
        | {
              name: string;
              length?: number;
              order?: 'ASC' | 'DESC';
              collate?: string;
              operator?: string;
          }[];
    concurrently?: boolean;
    unique?: boolean;
    using?: 'BTREE' | 'HASH' | 'GIST' | 'SPGIST' | 'GIN' | 'BRIN';
    operator?: string;
    where?: string;
};

export type SchemaOptions = {
    paranoid?: boolean;
    timestamps?: boolean;
    indexes?: SchemaIndexDefinition[];
};

/**
 * Complete schema definition for a model
 */
export type SchemaDefinition = {
    name: string;
    fields: Record<string, SchemaFieldDefinition>;
    options?: SchemaOptions;
};


export type BaseFindOptions<T> = {
    schema: string
};

export type FindOnePayload<T> = BaseFindOptions<T> & FindOptions<T>;
export type FindPayload<T> = BaseFindOptions<T> & FindOptions<T>;
export type CountPayload<T> = BaseFindOptions<T> & CountOptions<T>;

export type CreateOnePayload<T> = BaseFindOptions<T> & CreateOptions<T> & {
    values: Partial<T>;
}

export type AddRelationPayload<T, R> = {
    name: string;
    firstRelation: T;
    secondRelation: R;
    transaction?: Transaction;
}

export type Transaction = SequelizeTransaction;