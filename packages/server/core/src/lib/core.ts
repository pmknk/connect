import { Container } from 'inversify';
import fastify, { FastifyListenOptions } from 'fastify';
import { type FastifyApplicationInstance } from '../types';
import { StartupHooksService } from './services/startup-hooks.service';

/**
 * Represents the main application class that wraps a Fastify instance
 * and provides dependency injection capabilities.
 */
export class Application {
    private readonly fastifyInstance: FastifyApplicationInstance;
    readonly register: typeof this.fastifyInstance.register;

    /**
     * Creates a new Application instance.
     * Initializes the Fastify server with logging enabled and sets up
     * dependency injection container.
     */
    constructor() {
        const LOG_BIND_NAME = 'log';
        const DI_BIND_NAME = 'di';

        this.fastifyInstance = fastify({ logger: true }) as unknown as FastifyApplicationInstance;
        this.register = this.fastifyInstance.register.bind(this.fastifyInstance);

        const diContainer = new Container();

        diContainer.bind(LOG_BIND_NAME).toConstantValue(this.fastifyInstance.log);
        diContainer.bind(StartupHooksService).toSelf().inSingletonScope();
        
        this.fastifyInstance.decorate(DI_BIND_NAME, diContainer);
    }

    async start(options: FastifyListenOptions) {
        const startupHooksService = this.fastifyInstance.di.get(StartupHooksService);
        
        await startupHooksService.executeBeforeStartHooks(this.fastifyInstance);
        await this.fastifyInstance.listen(options);
        await startupHooksService.executeAfterStartHooks(this.fastifyInstance);
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