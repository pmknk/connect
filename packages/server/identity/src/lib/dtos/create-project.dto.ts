import { FastifyRequest } from 'fastify';
import { Project } from '../schemas/project.schema';

export type CreateProjectRequestDto = {
    name: string;
    slug: string;
    description?: string;
    userIds: string[];
};

export const toCreateProjectRequestDto = (
    request: FastifyRequest
): CreateProjectRequestDto => {
    const { name, slug, description, userIds } =
        request.body as CreateProjectRequestDto;
    return { name, slug, description, userIds };
};

export const createProjectRequestSchema = {
    type: 'object',
    required: ['name', 'slug', 'userIds'],
    properties: {
        name: { type: 'string' },
        slug: { type: 'string' },
        description: { type: 'string' },
        userIds: { type: 'array', items: { type: 'string' } }
    },
    additionalProperties: false
} as const;

export type CreateProjectResponseDto = {
    data: {
        id: string;
    };
};

export const toCreateProjectResponseDto = (
    project: Project
): CreateProjectResponseDto => {
    return {
        data: {
            id: project.id
        }
    };
};
