import type { SchemaDefinition } from '@content/server-database';

export type GetSchemasResponseDto = {
    data: SchemaDefinition[];
};

export const toGetSchemasResponseDto = (
    schemas: SchemaDefinition[]
): GetSchemasResponseDto => {
    return {
        data: schemas
    };
};


