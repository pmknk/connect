import { SchemaDefinition } from '@content/server-database';
import { Role } from './role.schema';
import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    NonAttribute
} from 'sequelize';
import { PermissionGroup } from './permission-group.schema';

export class Permission extends Model<
    InferAttributes<Permission>,
    InferCreationAttributes<Permission>
> {
    declare id: CreationOptional<string>;
    declare action: string;
    declare resource: string;
    declare roles?: NonAttribute<Role>[];
    declare permissionGroup?: NonAttribute<PermissionGroup>;
}

export const PermissionSchema: SchemaDefinition = {
    name: 'Permissions',
    type: 'internal',
    fields: {
        id: {
            type: 'uuid',
            primaryKey: true
        },
        action: {
            type: 'string',
            nullable: false
        },
        resource: {
            type: 'string',
            nullable: false
        },
        roles: {
            type: 'relation',
            relationType: 'belongsToMany',
            target: 'Roles',
            options: {
                through: 'RolePermissions',
                foreignKey: 'permissionId',
                otherKey: 'roleId',
                as: 'roles'
            }
        },
        permissionGroup: {
            type: 'relation',
            relationType: 'belongsTo',
            target: 'PermissionGroups',
            options: {
                foreignKey: 'permissionGroupId',
                as: 'permissionGroup'
            }
        }
    },
    options: {
        indexes: [
            {
                fields: ['action', 'resource'],
                unique: true
            }
        ]
    }
};
