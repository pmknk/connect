import type { SchemaDefinition } from '@content/server-database';
import { nameToApiSlug } from '../utils/slug-utils';

type SerializableFieldMeta = {
    name: string;
    admin?: Record<string, unknown>;
    nullable?: boolean;
    unique?: boolean;
    defaultValue?: unknown;
    values?: unknown[];
};

type SerializableFieldsMap = Record<string, SerializableFieldMeta>;

export type GetSchemasResponseDto = {
    data: {
        name: string;
        apiSlug: string;
        type: 'page' | 'collection' | 'internal';
        options: Record<string, unknown>;
        fields: SerializableFieldsMap;
    }[];
};

export const toGetSchemasResponseDto = (
    schemas: SchemaDefinition[]
): GetSchemasResponseDto => {
    return {
        data: schemas.map((schema) => ({
            name: schema.name,
            type: schema.type,
            apiSlug: nameToApiSlug(schema.name),
            options: schema.options ?? {},
            fields: Object.entries(schema.fields).reduce<SerializableFieldsMap>(
                (acc, [fieldName, field]) => {
                    acc[fieldName] = {
                        name: fieldName,
                        admin: field.admin as unknown as
                            | Record<string, unknown>
                            | undefined,
                        nullable: field.nullable,
                        unique: field.unique,
                        defaultValue: field.defaultValue as unknown,
                        values: field.values as unknown[] | undefined
                    };
                    return acc;
                },
                {}
            )
        }))
    };
};
