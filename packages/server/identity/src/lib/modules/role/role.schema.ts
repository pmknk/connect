import { SchemaDefinition } from "@avyyx/server-database";

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