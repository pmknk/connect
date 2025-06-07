import { SchemaDefinition } from "@avyyx/server-database";

export const UserSchema: SchemaDefinition = {
    name: 'User',
    fields: {
        id: {
            type: 'uuid',
            primaryKey: true,
        },
        email: {
            type: 'string',
            unique: true,
            nullable: false,
        },
        fullName: {
            type: 'string',
            nullable: false,
        },
        password: {
            type: 'string',
            nullable: false,
        },
        salt: {
            type: 'string',
            nullable: false,
        }
    },
    relations: [
        {
            type: 'belongsToMany',
            target: 'Role',
            options: {
                through: 'UserRoles',
            }
        }
    ]
}