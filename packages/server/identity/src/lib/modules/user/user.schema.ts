import { SchemaDefinition } from '@avyyx/server-database';

export const UserSchema: SchemaDefinition = {
    name: 'User',
    fields: {
        id: {
            type: 'uuid',
            primaryKey: true
        },
        email: {
            type: 'string',
            unique: true,
            nullable: false,
            validate: {
                isEmail: true
            }
        },
        fullName: {
            type: 'string',
            nullable: false,
        },
        password: {
            type: 'string',
            nullable: false
        },
        salt: {
            type: 'string',
            nullable: false
        },
        roles: {
            type: 'relation',
            relationType: 'belongsToMany',
            target: 'Role',
            options: {
                through: 'UserRoles',
                foreignKey: 'userId',
                otherKey: 'roleId'
            }
        }
    },
    options: {
        paranoid: true
    }
};
