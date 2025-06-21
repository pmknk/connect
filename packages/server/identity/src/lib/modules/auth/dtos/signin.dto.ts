import { FastifyRequest } from "fastify";

export type SigninDto = {
    email: string;
    password: string;
};

export const toSigninDto = (request: FastifyRequest): SigninDto => {
    const { email, password } = request.body as SigninDto;
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