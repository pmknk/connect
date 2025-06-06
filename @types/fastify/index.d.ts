import { Container } from 'inversify';

declare module 'fastify' {
    interface FastifyInstance {
        di: Container;
    }
} 