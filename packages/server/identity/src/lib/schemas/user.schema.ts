import { SchemaDefinition } from '@content/server-database';
import type { Project } from './project.schema';
import type { Role } from './role.schema';
import type { Invite } from './invite.schema';
import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute
} from 'sequelize';

export class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
> {
    declare id: CreationOptional<string>;
    declare email: string;
    declare fullName: string;
    declare password?: string;
    declare salt?: string;
    declare projects?: NonAttribute<Project>[];
    declare roles?: NonAttribute<Role>[];
    declare invite?: NonAttribute<Invite>;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare deletedAt: CreationOptional<Date>;
}

export const UserSchema: SchemaDefinition = {
    name: 'Users',
    fields: {
        id: {
            type: 'uuid',
            primaryKey: true
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
            nullable: false
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
