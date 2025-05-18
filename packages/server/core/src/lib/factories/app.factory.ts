import fastify from 'fastify';

export const createApp = () => {
    return fastify({ logger: true })
}