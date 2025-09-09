import { FastifyRequest } from 'fastify';

/**
 * DTO for initializing the admin user.
 */
export type InitAdminUserDto = {
    /** Admin user's email address */
    email: string;
    /** Admin user's password */
    password: string;
};

/**
 * Converts a FastifyRequest to an InitAdminUserDto.
 * @param request - Fastify request containing the admin user data in the body.
 * @returns The InitAdminUserDto object.
 */
export const toInitAdminUserDto = (
    request: FastifyRequest
): InitAdminUserDto => {
    const { email, password } = request.body as InitAdminUserDto;
    return { email, password };
};

/**
 * JSON schema for validating InitAdminUserDto.
 */
export const initAdminUserDtoSchema = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 8 }
    }
} as const;

/**
 * DTO for the response after initializing the admin user.
 */
export type InitAdminResponseDto = {
    data: {
        /** Success message */
        message: string;
    };
};

/**
 * Converts a message string to an InitAdminResponseDto.
 * @param message - The success message to return.
 * @returns The InitAdminResponseDto object.
 */
export const toInitAdminResponseDto = (
    message: string
): InitAdminResponseDto => {
    return { data: { message } };
};
