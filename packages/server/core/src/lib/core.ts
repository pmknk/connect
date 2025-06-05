import { Container } from 'inversify';
import fastify, { FastifyInstance } from 'fastify';

/**
 * Represents the main application class that wraps a Fastify instance
 * and provides dependency injection capabilities.
 */
export class Application {
    /** The underlying Fastify instance */
    private readonly fastifyInstance: FastifyInstance;
    /** Proxy to the Fastify register method */
    readonly register: typeof this.fastifyInstance.register;
    /** Proxy to the Fastify listen method */
    readonly listen: typeof this.fastifyInstance.listen;

    /**
     * Creates a new Application instance.
     * Initializes the Fastify server with logging enabled and sets up
     * dependency injection container.
     */
    constructor() {
        this.fastifyInstance = fastify({ logger: true });
        this.register = this.fastifyInstance.register;
        this.listen = this.fastifyInstance.listen;

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