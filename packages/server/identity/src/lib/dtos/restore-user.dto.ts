import { FastifyRequest } from 'fastify';

/**
 * DTO for restoring a previously deleted user by ID.
 */
export type RestoreUserRequestDto = {
    id: string;
};

/**
 * Maps FastifyRequest params to RestoreUserRequestDto.
 * @param request - Fastify request containing route params
 * @returns The RestoreUserRequestDto object
 */
export const toRestoreUserRequestDto = (
    request: FastifyRequest
): RestoreUserRequestDto => {
    const { id } = request.params as RestoreUserRequestDto;
    return { id };
};

/**
 * JSON schema for validating restore user route params.
 */
export const restoreUserRequestSchema = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'string' }
        }
    }
} as const;
