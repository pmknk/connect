import { FastifyRequest } from 'fastify';

/**
 * DTO for deleting a user by ID.
 */
export type DeleteUserRequestDto = {
    id: string;
};

/**
 * Maps FastifyRequest params to DeleteUserRequestDto.
 * @param request - Fastify request containing route params
 * @returns The DeleteUserRequestDto object
 */
export const toDeleteUserRequestDto = (
    request: FastifyRequest
): DeleteUserRequestDto => {
    const { id } = request.params as DeleteUserRequestDto;
    return { id };
};

/**
 * JSON schema for validating delete user route params.
 */
export const deleteUserRequestSchema = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'string' }
        }
    }
} as const;
