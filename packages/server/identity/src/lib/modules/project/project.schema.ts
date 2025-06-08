import { SchemaDefinition } from '@avyyx/server-database';

export const ProjectSchema: SchemaDefinition = {
    name: 'Project',
    fields: {
        id: {
            type: 'uuid',
            primaryKey: true
        },
        slug: {
            type: 'string',
            nullable: false,
            unique: true
        },
        name: {
            type: 'string',
            nullable: false,
            unique: true,
        },
        description: {
            type: 'string',
            nullable: true,
        },
        icon: {
            type: 'string',
            nullable: true
        },
        color: {
            type: 'string',
            nullable: true
        },
        users: {
            type: 'relation',
            relationType: 'belongsToMany',
            target: 'User',
            options: {
                through: 'ProjectUsers',
                foreignKey: 'projectId',
                otherKey: 'userId'
            }
        }
    },
    options: {
        paranoid: true,
        timestamps: true
    }
};
