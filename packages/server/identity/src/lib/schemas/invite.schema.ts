import { SchemaDefinition } from '@content/server-database';
import { User } from './user.schema';
import {
    CreationOptional,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute
} from 'sequelize';

export class Invite extends Model<
    InferAttributes<Invite>,
    InferCreationAttributes<Invite>
> {
    declare id: CreationOptional<string>;
    declare code: string;
    declare userId?: ForeignKey<string>;
    declare user?: NonAttribute<User>;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

export const InviteSchema: SchemaDefinition = {
    name: 'Invites',
    fields: {
        id: {
            type: 'uuid',
            primaryKey: true
        },
        code: {
            type: 'string',
            unique: true,
            nullable: false
        },
        user: {
            type: 'relation',
            relationType: 'belongsTo',
            target: 'Users',
            options: {
                as: 'user',
                foreignKey: 'userId'
            }
        }
    },
};
