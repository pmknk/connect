import { SchemaDefinition } from '@avyyx/server-database';
import type { Project } from '../project/project.schema';
import type { Role } from '../role/role.schema';
import type { Invite } from '../invite/invite.schema';

export interface User {
    id: string;
    email: string;
    fullName: string;
    password?: string;
    salt?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    projects: Project[];
    roles: Role[];
    invite?: Invite;
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
            nullable: true
        },
        salt: {
            type: 'string',
            nullable: true
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
        },
        invite: {
            type: 'relation',
            relationType: 'hasOne',
            target: 'Invites',
            options: {
                as: 'invite',
                foreignKey: 'userId'
            }
        }
    },
    options: {
        paranoid: true
    }
};
