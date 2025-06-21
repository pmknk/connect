import { FastifyApplicationInstance } from '@avyyx/server-core';
import { injectable } from 'inversify';
import { JwtService } from './services/jwt.service';
import { SigninService } from './services/signin.service';
import { AuthController } from './auth.controller';
import { AuthRouter } from './auth.router';
import { AuthMiddleware } from './auth.middleware';
import { FastifyRequest } from 'fastify';
import { User } from '../user/user.schema';

/**
 * Module responsible for handling authentication-related functionality
 * 
 * This module initializes and configures all authentication-related services,
 * controllers, and routes within the Fastify application.
 */
@injectable()
export class AuthModule {
    /**
     * Initializes the AuthModule by binding dependencies and setting up routes
     * 
     * @param {FastifyApplicationInstance} fastify - The Fastify application instance
     * @returns {Promise<void>} A promise that resolves when initialization is complete
     * 
     * @example
     * ```typescript
     * const authModule = new AuthModule();
     * await authModule.initialize(fastify);
     * ```
     */
    async initialize(fastify: FastifyApplicationInstance): Promise<void> {
        // Bind all authentication-related services to the dependency injection container
        fastify.di.bind(JwtService).toSelf();
        fastify.di.bind(SigninService).toSelf();
        fastify.di.bind(AuthController).toSelf();
        fastify.di.bind(AuthRouter).toSelf();
        fastify.di.bind(AuthMiddleware).toSelf();

        // Initialize the authentication router with the Fastify instance
        fastify.di.get(AuthRouter).initialize(fastify);

        fastify.addHook(
            'preHandler',
            async (request, reply) => {
                await fastify.di
                    .get(AuthMiddleware)
                    .authenticate(request as FastifyRequest & { user: User | null })
            }
        );
    }
}
