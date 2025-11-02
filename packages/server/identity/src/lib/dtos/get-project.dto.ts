import { FastifyRequest } from 'fastify';
import { Project } from '../schemas/project.schema';

export type GetProjectRequestDto = {
    id: string;
    include?: {
        association: string;
    }[];
};

export const toGetProjectRequestDto = (
    request: FastifyRequest
): GetProjectRequestDto => {
    const { id } = (request.params as { id: string }) ?? {};
    const { include } = request.query as {
        include?: { association: string }[];
    };
    return { id, include };
};

export const getProjectRequestSchema = {
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
            include: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        association: { type: 'string' }
                    }
                },
                default: []
            }
        }
    }
} as const;

export type GetProjectResponseDto = {
    data: {
        id: string;
        slug: string;
        name: string;
        description?: string;
        createdAt?: Date;
        updatedAt?: Date;
        deletedAt?: Date;
    };
};

export const toGetProjectResponseDto = (
    project: Project
): GetProjectResponseDto => {
    return {
        data: {
            id: project.id,
            slug: project.slug,
            name: project.name,
            description: project.description,
            createdAt: project.createdAt,
            updatedAt: project.updatedAt,
            deletedAt: project.deletedAt
        }
    };
};


