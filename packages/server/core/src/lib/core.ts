import qs from 'qs';
import { Container } from 'inversify';
import fastify, { FastifyListenOptions } from 'fastify';
import { type FastifyApplicationInstance } from '../types';

/**
 * Represents the main application class that wraps a Fastify instance
 * and provides dependency injection capabilities.
 */
export class Application {
    readonly fastifyInstance: FastifyApplicationInstance;
    readonly register: typeof this.fastifyInstance.register;

    /**
     * Creates a new Application instance.
     * Initializes the Fastify server with logging enabled and sets up
     * dependency injection container.
     */
    constructor() {
        const LOG_BIND_NAME = 'log';
        const DI_BIND_NAME = 'di';

        this.fastifyInstance = fastify({
            logger: true,
            querystringParser: (str) => qs.parse(str)
        }) as unknown as FastifyApplicationInstance;
        this.register = this.fastifyInstance.register.bind(
            this.fastifyInstance
        );

        const diContainer = new Container();

        diContainer
            .bind(LOG_BIND_NAME)
            .toConstantValue(this.fastifyInstance.log);

        this.fastifyInstance.decorate(DI_BIND_NAME, diContainer);
    }

    async start(options: FastifyListenOptions) {
        await this.fastifyInstance.listen(options);
    }
}

/**
 * Creates and returns a new Application instance
 * @returns {Application} A new Application instance
 */
export default () => {
    const application = new Application();
    return application;
};
