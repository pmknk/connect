import { Container } from 'inversify';
import fastify from 'fastify';
import { type FastifyApplicationInstance } from '../types';

/**
 * Represents the main application class that wraps a Fastify instance
 * and provides dependency injection capabilities.
 */
export class Application {
    private readonly fastifyInstance: FastifyApplicationInstance;
    readonly register: typeof this.fastifyInstance.register;
    readonly listen: typeof this.fastifyInstance.listen;

    /**
     * Creates a new Application instance.
     * Initializes the Fastify server with logging enabled and sets up
     * dependency injection container.
     */
    constructor() {
        this.fastifyInstance = fastify({ logger: true }) as unknown as FastifyApplicationInstance;
        this.register = this.fastifyInstance.register.bind(this.fastifyInstance);
        this.listen = this.fastifyInstance.listen.bind(this.fastifyInstance);

        const diContainer = new Container();

        diContainer.bind('log').toConstantValue(this.app.log);
        this.app.decorate('di', diContainer);
    }

    /**
     * Gets the underlying Fastify instance
     * @returns {FastifyInstance} The Fastify application instance
     */
    get app() {
        return this.fastifyInstance;
    }
}

/**
 * Creates and returns a new Application instance
 * @returns {Application} A new Application instance
 */
export default () => {
    const application = new Application();
    return application;
}