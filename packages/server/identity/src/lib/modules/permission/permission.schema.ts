import { SchemaDefinition } from "@avyyx/server-database";

export const PermissionSchema: SchemaDefinition = {
    name: 'Permission',
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
            target: 'Role',
            options: {
                through: 'RolePermissions',
                foreignKey: 'permissionId',
                otherKey: 'roleId'
            }
        },
        permissionGroup: {
            type: 'relation',
            relationType: 'belongsTo',
            target: 'PermissionGroup',
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
}