import { FastifyRequest } from 'fastify';

export type UpdatePasswordRequestDto = {
    password: string;
};

export const updatePasswordRequestSchema = {
    type: 'object',
    required: ['password'],
    properties: {
        password: { type: 'string' }
    }
} as const;

export const toUpdatePasswordRequestDto = (
    request: FastifyRequest
): UpdatePasswordRequestDto => {
    const { password } = request.body as UpdatePasswordRequestDto;
    return { password };
};

export type UpdatePasswordResponseDto = {
    data: {
        success: boolean;
    };
};

export const toUpdatePasswordResponseDto = (
    response: UpdatePasswordResponseDto
): UpdatePasswordResponseDto => {
    return response;
};
