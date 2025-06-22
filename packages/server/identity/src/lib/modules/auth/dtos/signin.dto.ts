import { FastifyRequest } from "fastify";

export type SigninRequestDto = {
    email: string;
    password: string;
};

export const toSigninRequestDto = (request: FastifyRequest): SigninRequestDto => {
    const { email, password } = request.body as SigninRequestDto;
    return { email, password };
};

export const signinRequestSchema = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 8 }
    }
} as const;