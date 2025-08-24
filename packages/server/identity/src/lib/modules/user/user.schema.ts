import { SchemaDefinition } from '@avyyx/server-database';
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
                as: 'roles',
                through: 'UserRoles',
                foreignKey: 'userId',
                otherKey: 'roleId'
            }
        },
        projects: {
            type: 'relation',
            relationType: 'belongsToMany',
            target: 'Projects',
            options: {
                as: 'projects',
                through: 'ProjectUsers',
                foreignKey: 'userId',
                otherKey: 'projectId'
            }
        }
    },
    options: {
        paranoid: true
    }
};
