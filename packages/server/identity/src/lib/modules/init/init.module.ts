import { FastifyApplicationInstance } from "@avyyx/server-core";
import { InitRouter } from "./init.router";
import { InitController } from "./init.controller";
import { InitService } from "./init.service";

/**
 * Module responsible for initializing the application's core components
 */
export class InitModule {

    /**
     * Initializes the Init module by binding its dependencies and setting up routes
     * @param fastify - The Fastify application instance
     * @returns Promise that resolves when initialization is complete
     */
    async initialize(fastify: FastifyApplicationInstance): Promise<void> {
        fastify.di.bind(InitRouter).toSelf();
        fastify.di.bind(InitController).toSelf();
        fastify.di.bind(InitService).toSelf();

        fastify.di.get(InitRouter).initialize(fastify);
    }
}