import fastify from 'fastify';
import { Container } from 'inversify';

export const createApp = () => {
    const app = fastify({ logger: true })
    app.decorate('di', new Container());

    return app
}