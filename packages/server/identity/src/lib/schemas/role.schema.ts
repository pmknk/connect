import { SchemaDefinition } from '@connect/server-database';
import { User } from './user.schema';
import {
    Model,
    type CreationOptional,
    type InferAttributes,
    type InferCreationAttributes,
    type NonAttribute
} from 'sequelize';

export class Role extends Model<
    InferAttributes<Role>,
    InferCreationAttributes<Role>
> {
    declare id: CreationOptional<string>;
    declare name: string;
    declare description: string;
    declare slug: string;
    declare users: NonAttribute<User>[];

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

export const RoleSchema: SchemaDefinition = {
    name: 'Roles',
    fields: {
        id: {
            type: 'uuid',
            primaryKey: true
        },
        name: {
            type: 'string',
            unique: true,
            nullable: false
        },
        description: {
            type: 'string'
        },
        slug: {
            type: 'string',
            unique: true,
            nullable: false
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
};
