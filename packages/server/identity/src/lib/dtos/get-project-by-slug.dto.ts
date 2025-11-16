import { FastifyRequest } from 'fastify';
import { type GetProjectResponseDto } from './get-project.dto';

export type GetProjectBySlugRequestDto = {
    slug: string;
    include?: {
        association: string;
    }[];
};

export const toGetProjectBySlugRequestDto = (
    request: FastifyRequest
): GetProjectBySlugRequestDto => {
    const { slug } = (request.params as { slug: string }) ?? {};
    const { include } = request.query as {
        include?: { association: string }[];
    };
    return { slug, include };
};

export const getProjectBySlugRequestSchema = {
    params: {
        type: 'object',
        required: ['slug'],
        properties: {
            slug: { type: 'string' }
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

export type GetProjectBySlugResponseDto = GetProjectResponseDto;


