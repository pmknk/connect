import { FastifyRequest } from 'fastify';
import { type Invite } from '../schemas/invite.schema';

export type CreateInviteDto = {
    email: string;
    fullname: string;
    roleId: string;
    projectIds: string[];
};

export type CreateInviteResponse = {
    data: {
        id: string;
    };
};

export const toCreateInviteDto = (request: FastifyRequest): CreateInviteDto => {
    const { email, fullname, roleId, projectIds } =
        request.body as CreateInviteDto;
    return { email, fullname, roleId, projectIds };
};

export const toCreateInviteResponse = (
    invite: Invite
): CreateInviteResponse => {
    const { id } = invite;
    return { data: { id } };
};

export const createInviteRequestSchema = {
    body: {
        type: 'object',
        properties: {
            email: { type: 'string', format: 'email' },
            fullName: { type: 'string' },
            roleId: { type: 'string' },
            projectIds: { type: 'array', items: { type: 'string' } }
        }
    },
    required: ['email', 'fullName', 'roleId']
};
