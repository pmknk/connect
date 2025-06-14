import { SchemaDefinition } from "@avyyx/server-database";

export interface PermissionGroup {
    id: string;
    name: string;
    slug: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
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
        slug:{
            type: 'string',
            nullable: false,
            unique: true
        },
        description: {
            type: 'string',
            nullable: true,
        },
        permissions: {
            type: 'relation',
            relationType: 'hasMany',
            target: 'Permissions',
            options: {
                foreignKey: 'permissionGroupId',
            }
        }
    }
}