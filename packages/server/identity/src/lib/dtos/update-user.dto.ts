import { FastifyRequest } from 'fastify';
import { User } from '../schemas/user.schema';

/**
 * DTO for updating a user.
 */
export type UpdateUserRequestDto = {
    /** The unique identifier of the user */
    id: string;
    /** The email address of the user */
    email: string;
    /** The full name of the user */
    fullName: string;
    /** List of project IDs associated with the user */
    projectIds: string[];
    /** The role ID assigned to the user */
    roleId: string;
};

/**
 * DTO for the response after updating a user.
 */
export type UpdateUserResponseDto = {
    data: {
        /** The unique identifier of the updated user */
        id: string;
    };
};

/**
 * JSON schema for validating the update user request body.
 */
export const updateUserRequestSchema = {
    body: {
        type: 'object',
        required: ['id', 'email', 'fullName', 'projectIds', 'roleId'],
        properties: {
            id: { type: 'string' },
            email: { type: 'string' },
            fullName: { type: 'string' },
            projectIds: { type: 'array', items: { type: 'string' } },
            roleId: { type: 'string' },
        }
    }
} as const;

/**
 * Converts a FastifyRequest to an UpdateUserRequestDto.
 * @param request - Fastify request containing the user update data in the body.
 * @returns The UpdateUserRequestDto object.
 */
export const toUpdateUserRequestDto = (
    request: FastifyRequest
): UpdateUserRequestDto => {
    const { id, email, fullName, projectIds, roleId } =
        request.body as UpdateUserRequestDto;
    return { id, email, fullName, projectIds, roleId };
};

/**
 * Converts a User entity to an UpdateUserResponseDto.
 * @param user - The User entity.
 * @returns The UpdateUserResponseDto object.
 */
export const toUpdateUserResponseDto = (user: User): UpdateUserResponseDto => {
    return { data: { id: user.id } };
};
