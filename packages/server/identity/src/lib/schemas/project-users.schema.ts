import { SchemaDefinition } from '@content/server-database';
import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model
} from 'sequelize';

export class ProjectUsers extends Model<
    InferAttributes<ProjectUsers>,
    InferCreationAttributes<ProjectUsers>
> {
    declare id: CreationOptional<string>;
    declare projectId: string;
    declare userId: string;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

export const ProjectUsersSchema: SchemaDefinition = {
    name: 'ProjectUsers',
    fields: {
        id: {
            type: 'uuid',
            primaryKey: true
        },
        projectId: {
            type: 'uuid',
            nullable: false
        },
        userId: {
            type: 'uuid',
            nullable: false
        }
    }
};
