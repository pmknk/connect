import { SchemaDefinition } from "@avyyx/server-database";

export const RoleSchema: SchemaDefinition = {
    name: 'Role',
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
        code: {
            type: 'string',
            unique: true,
            nullable: false,
        },
    }
}