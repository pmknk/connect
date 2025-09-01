import { FastifyRequest } from 'fastify';

export type SigninRequestDto = {
    email: string;
    password: string;
};

export const toSigninRequestDto = (
    request: FastifyRequest
): SigninRequestDto => {
    const { email, password } = request.body as SigninRequestDto;
    return { email, password };
};

export const signinRequestSchema = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
        email: { type: 'string' },
        password: { type: 'string' }
    }
} as const;
