import { FastifyRequest } from "fastify";
import { Invite } from "../schemas/invite.schema";

export type DeleteInviteDto = {
    id: string;
};

export const toDeleteInviteDto = (request: FastifyRequest): DeleteInviteDto => {
    const { id } = request.body as DeleteInviteDto;
    return { id };
};

export const deleteInviteRequestSchema = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'string' }
        }
    }
};

export type DeleteInviteResponseDto = {
    data: {
        id: string;
    };
};

export const toDeleteInviteResponseDto = (invite: Pick<Invite, 'id'>): DeleteInviteResponseDto => {
    return { data: { id: invite.id } };
};