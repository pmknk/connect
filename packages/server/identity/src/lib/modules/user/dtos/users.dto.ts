import { FastifyRequest } from 'fastify';
import { User } from '../user.schema';

export type UsersRequestDto = {
    offset?: number;
    limit?: number;
    include?: {
        association: string;
    }[];
    paranoid?: boolean;
};

export const toUsersRequestDto = (request: FastifyRequest): UsersRequestDto => {
    const { offset, limit, include, paranoid } = request.query as UsersRequestDto;
    return { offset, limit, include, paranoid };
};

export const usersRequestSchema = {
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
        include: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    association: { type: 'string' },
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

export type UsersResponseDto = {
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
    }[];
    meta: {
        total: number;
        offset: number;
        limit: number;
    };
};

export const toUsersResponseDto = (
    users: User[],
    meta: UsersResponseDto['meta']
): UsersResponseDto => {
    return {
        data: users.map((user) => ({
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            deletedAt: user.deletedAt,
            projects: user.projects?.map((project) => ({
                id: project.id,
                name: project.name,
                slug: project.slug,
                description: project.description
            })),
            roles: user.roles?.map((role) => ({
                id: role.id,
                slug: role.slug,
                name: role.name,
                description: role.description
            }))
        })),
        meta: {
            total: meta.total,
            offset: meta.offset,
            limit: meta.limit
        }
    };
};
