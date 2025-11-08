import { FastifyInstance } from 'fastify';
import { Container } from 'inversify';

export interface FastifyApplicationInstance extends FastifyInstance {
    di: Container;
}
