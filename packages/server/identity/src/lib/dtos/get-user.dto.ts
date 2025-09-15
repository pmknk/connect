import { FastifyRequest } from 'fastify';
import { User } from '../schemas/user.schema';

export type GetUserRequestDto = {
    id: string;
    include?: {
        association: string;
    }[];
};

export const toGetUserRequestDto = (
    request: FastifyRequest
): GetUserRequestDto => {
    const { id } = (request.params as { id: string }) ?? {};
    const { include } = request.query as {
        include?: { association: string }[];
    };
    return { id, include };
};

export const getUserRequestSchema = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'string' }
        }
    },
    querystring: {
        type: 'object',
        properties: {
            include: { type: 'array', items: { type: 'string' } }
        }
    }
} as const;

export type GetUserResponseDto = {
    data: {
        id: string;
        email: string;
        fullName: string;
        createdAt?: Date;
        updatedAt?: Date;
        deletedAt?: Date;
        projects: {
            id: string;
            name: string;
            slug: string;
            description?: string;
        }[];
        roles: {
            id: string;
            slug: string;
            name: string;
            description: string;
        }[];
        invite?: {
            id?: string;
            code?: string;
        };
    };
};

export const toGetUserResponseDto = (user: User): GetUserResponseDto => {
    return {
        data: {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            deletedAt: user.deletedAt,
            projects: (user.projects ?? []).map((project) => ({
                id: project.id,
                name: project.name,
                slug: project.slug,
                description: project.description
            })),
            roles: (user.roles ?? []).map((role) => ({
                id: role.id,
                slug: role.slug,
                name: role.name,
                description: role.description
            })),
            invite: user.invite
                ? {
                      id: user.invite?.id,
                      code: user.invite?.code
                  }
                : undefined
        }
    };
};
