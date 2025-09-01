import { SchemaDefinition } from "@avyyx/server-database";
import { User } from "../user/user.schema";

export interface Role {
    id: string;
    name: string;
    description: string;
    slug: string;
    users: User[];
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
        users: {
            type: 'relation',
            relationType: 'belongsToMany',
            target: 'Users',
            options: {
                through: 'UserRoles',
                foreignKey: 'roleId',
                otherKey: 'userId',
                as: 'users'
            }
        }
    }
}