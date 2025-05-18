import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

export type IdentityPluginOptions = {
    jwtSecret: string;
    admin?: {
        fullName: string;
        email: string;
        password: string;
    };
};

export default fp(async (fastify: FastifyInstance, options: IdentityPluginOptions) => {
    console.log(fastify)
    console.log(options)
})

