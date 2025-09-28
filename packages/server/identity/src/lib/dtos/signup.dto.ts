import { FastifyRequest } from "fastify";

/**
 * DTO for the request after signing up.
 */
export type SignupRequestDto = {
    password: string;
    inviteCode: string;
};

/**
 * Schema for the request after signing up.
 */
export const signupRequestSchema = {
    type: 'object',
    required: ['password', 'inviteCode'],
    properties: {
        password: { type: 'string' },
        inviteCode: { type: 'string' }
    }
} as const;

/**
 * Converts a request to a SignupRequestDto.
 * @param request - The request to convert.
 * @returns The SignupRequestDto.
 */
export const toSignupRequestDto = (request: FastifyRequest): SignupRequestDto => {
    const { password, inviteCode } = request.body as SignupRequestDto;
    return { password, inviteCode };
};

/**
 * DTO for the response after signing up.
 */
export type SignupResponseDto = {
    data: {
        success: boolean;
    }
};

/**
 * Converts a response to a SignupResponseDto.
 * @param response - The response to convert.
 * @returns The SignupResponseDto.
 */
export const toSignupResponseDto = (response: SignupResponseDto): SignupResponseDto => {
    return response;
};