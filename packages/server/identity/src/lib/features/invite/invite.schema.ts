import { SchemaDefinition } from "@avyyx/server-database";
import { User } from "../user/user.schema";

export interface Invite {
    id: string;
    code: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    user?: User;
}

export const InviteSchema: SchemaDefinition = {
    name: 'Invites',
    fields: {
        id: {
            type: 'uuid',
            primaryKey: true,
        },
        code: {
            type: 'string',
            unique: true,
            nullable: false,
        },
        user: {
            type: 'relation',
            relationType: 'belongsTo',
            target: 'Users',
            options: {
                as: 'user',
                foreignKey: 'userId',
            }
        }
    }
};