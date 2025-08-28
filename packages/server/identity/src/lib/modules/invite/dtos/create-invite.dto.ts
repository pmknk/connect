import { FastifyRequest } from "fastify";

export type CreateInviteDto = {
    email: string;
    fullName: string;
    roleId: string;
    projectIds: string[];
};

export const toCreateInviteDto = (request: FastifyRequest): CreateInviteDto => {
    const { email, fullName, roleId, projectIds } = request.body as CreateInviteDto;
    return { email, fullName, roleId, projectIds };
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
    required: ['email', 'fullName', 'roleId',]
};