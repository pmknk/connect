import { SchemaDefinition } from '@content/server-database';
import { User } from './user.schema';
import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    NonAttribute
} from 'sequelize';

export class Project extends Model<
    InferAttributes<Project>,
    InferCreationAttributes<Project>
> {
    declare id: CreationOptional<string>;
    declare slug: string;
    declare name: string;
    declare description?: string;
    declare icon?: string;
    declare color?: string;
    declare users?: NonAttribute<User>[];
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare deletedAt: CreationOptional<Date>;
}

export const ProjectSchema: SchemaDefinition = {
    name: 'Projects',
    type: 'internal',
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
                otherKey: 'userId',
                as: 'users'
            }
        }
    },
    options: {
        paranoid: true,
        timestamps: true
    }
};
