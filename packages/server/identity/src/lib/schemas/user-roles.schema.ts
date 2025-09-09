import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model
} from 'sequelize';
import { SchemaDefinition } from '../../../../database/src/lib/types';

export class UserRoles extends Model<
    InferAttributes<UserRoles>,
    InferCreationAttributes<UserRoles>
> {
    declare id: CreationOptional<string>;
    declare userId: string;
    declare roleId: string;
}

export const UserRolesSchema: SchemaDefinition = {
    name: 'UserRoles',
    fields: {
        id: {
            type: 'uuid',
            primaryKey: true
        },
        userId: {
            type: 'uuid',
            nullable: false
        },
        roleId: {
            type: 'uuid',
            nullable: false
        }
    }
};
