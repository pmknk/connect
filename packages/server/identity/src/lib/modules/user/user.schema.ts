import { SchemaDefinition } from '@avyyx/server-database';
import { v4 as uuidv4 } from 'uuid';
import type { Project } from '../project/project.schema';
import type { Role } from '../role/role.schema';

export interface User {
    id: string;
    email: string;
    fullName: string;
    password: string;
    salt: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    projects: Project[];
    roles: Role[];
}

export const UserSchema: SchemaDefinition = {
    name: 'Users',
    fields: {
        id: {
            type: 'uuid',
            primaryKey: true,
            defaultValue: uuidv4()
        },
        email: {
            type: 'string',
            unique: true,
            nullable: false,
            validate: {
                isEmail: true
            }
        },
        fullName: {
            type: 'string',
            nullable: false,
        },
        password: {
            type: 'string',
            nullable: false
        },
        salt: {
            type: 'string',
            nullable: false
        },
        roles: {
            type: 'relation',
            relationType: 'belongsToMany',
            target: 'Roles',
            options: {
                through: 'UserRoles',
                foreignKey: 'userId',
                otherKey: 'roleId'
            }
        }
    },
    options: {
        paranoid: true
    }
};
