import { SchemaDefinition } from '@content/server-database';
import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model
} from 'sequelize';
import { Permission } from './permission.schema';

export class PermissionGroup extends Model<
    InferAttributes<PermissionGroup>,
    InferCreationAttributes<PermissionGroup>
> {
    declare id: CreationOptional<string>;
    declare name: string;
    declare slug: string;
    declare description: string;
    declare permissions: Permission[];

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

export const PermissionGroupSchema: SchemaDefinition = {
    name: 'PermissionGroups',
    fields: {
        id: {
            type: 'uuid',
            primaryKey: true
        },
        name: {
            type: 'string',
            nullable: false
        },
        slug: {
            type: 'string',
            nullable: false,
            unique: true
        },
        description: {
            type: 'string',
            nullable: true
        },
        permissions: {
            type: 'relation',
            relationType: 'hasMany',
            target: 'Permissions',
            options: {
                foreignKey: 'permissionGroupId',
                as: 'permissions'
            }
        }
    }
};
