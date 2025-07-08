import { FastifyRequest } from 'fastify';
import { Project } from '../project.schema';

export type CreateProjectRequestDto = {
    name: string;
    slug: string;
    description?: string;
    userIds: string[];
    assignAvailableUsers: boolean;
};

export const toCreateProjectRequestDto = (
    request: FastifyRequest
): CreateProjectRequestDto => {
    const { name, slug, description, userIds, assignAvailableUsers } =
        request.body as CreateProjectRequestDto;
    return { name, slug, description, userIds, assignAvailableUsers };
};

export const createProjectRequestSchema = {
    type: 'object',
    required: ['name', 'userIds'],
    properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        userIds: { type: 'array', items: { type: 'string' } },
        assignAvailableUsers: { type: 'boolean' }
    }
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
