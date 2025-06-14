import { SchemaDefinition } from "@avyyx/server-database";

export interface Role {
    id: string;
    name: string;
    description: string;
    slug: string;
}

export const RoleSchema: SchemaDefinition = {
    name: 'Roles',
    fields: {
        id: {
            type: 'uuid',
            primaryKey: true,
        },
        name: {
            type: 'string',
            unique: true,
            nullable: false,
        },
        description: {
            type: 'string',
        },
        slug: {
            type: 'string',
            unique: true,
            nullable: false,
        },
    }
}