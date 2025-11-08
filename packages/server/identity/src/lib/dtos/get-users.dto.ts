import { FastifyRequest } from 'fastify';
import { User } from '../schemas/user.schema';

export type GetUsersRequestDto = {
    search?: string;
    offset?: number;
    limit?: number;
    include?: {
        association: string;
    }[];
    paranoid?: boolean;
};

export const toGetUsersRequestDto = (
    request: FastifyRequest
): GetUsersRequestDto => {
    const { offset, limit, include, paranoid, search } =
        request.query as GetUsersRequestDto;
    return { offset, limit, include, paranoid, search };
};

export const getUsersRequestSchema = {
    type: 'object',
    properties: {
        offset: {
            type: 'number',
            default: 0
        },
        limit: {
            type: 'number',
            default: 10
        },
        search: {
            type: 'string',
            default: ''
        },
        include: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    association: { type: 'string' }
                }
            },
            default: []
        },
        paranoid: {
            type: 'boolean',
            default: true
        }
    }
} as const;

export type GetUsersResponseDto = {
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
    }[];
    meta: {
        total: number;
        offset: number;
        limit: number;
    };
};

export const toGetUsersResponseDto = (
    users: User[],
    meta: GetUsersResponseDto['meta']
): GetUsersResponseDto => {
    return {
        data: users.map((user) => ({
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
        })),
        meta: {
            total: meta.total,
            offset: meta.offset,
            limit: meta.limit
        }
    };
};
