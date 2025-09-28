import { FastifyRequest } from "fastify";
import { Invite } from "../schemas/invite.schema";

export type GetInviteByCodeDto = {
    code: string;
};

export const toGetInviteByCodeDto = (request: FastifyRequest): GetInviteByCodeDto => {
    const { code } = (request.params as { code: string }) ?? {};

    return {
        code
    };
};

export const getInviteByCodeRequestSchema = {
    params: {
        type: 'object',
        required: ['code'],
        properties: {
            code: { type: 'string' }
        }
    }
};

export type GetInviteByCodeResponseDto = {
    data: {
        id: string;
        code: string;
        user: {
            id: string;
            email: string;
            fullName: string;
        };
        createdAt: Date;
        updatedAt: Date;
    };
};

export const toGetInviteByCodeResponseDto = (invite: Invite): GetInviteByCodeResponseDto => {
    return {
        data: {
            id: invite.id,
            code: invite.code,
            user: {
                id: invite.user?.id ?? '',
                email: invite.user?.email ?? '',
                fullName: invite.user?.fullName ?? ''
            },
            createdAt: invite.createdAt,
            updatedAt: invite.updatedAt
        }
    };
};