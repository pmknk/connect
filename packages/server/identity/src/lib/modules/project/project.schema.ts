import { SchemaDefinition } from '@avyyx/server-database';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../user/user.schema';

export type Project = {
    id: string;
    slug: string;
    name: string;
    description?: string;
    icon?: string;
    color?: string;
    users: User[];
    createdAt: Date;
    updatedAt: Date;
};

export type ProjectUser = {
    id: string;
    projectId: string;
    userId: string;
};

export const ProjectSchema: SchemaDefinition = {
    name: 'Projects',
    fields: {
        id: {
            type: 'uuid',
            primaryKey: true,
            defaultValue: uuidv4()
        },
        slug: {
            type: 'string',
            nullable: false,
            unique: true
        },
        name: {
            type: 'string',
            nullable: false,
            unique: true
        },
        description: {
            type: 'string',
            nullable: true
        },
        users: {
            type: 'relation',
            relationType: 'belongsToMany',
            target: 'Users',
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
