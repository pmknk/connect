import { injectable } from 'inversify';
import { AuthController } from '../controllers/auth.controller';
import { FastifyApplicationInstance } from '@content/server-core';
import { TOKEN_SCOPES } from '../constants';
import { signinRequestSchema } from '../dtos/signin.dto';
import { signupRequestSchema } from '../dtos/signup.dto';
import { updatePasswordRequestSchema } from '../dtos/update-password.dto';

/**
 * Router responsible for handling authentication-related routes
 *
 * This class manages the routing configuration for authentication endpoints,
 * including signin and user profile retrieval routes.
 */
@injectable()
export class AuthRouter {
    /**
     * Creates an instance of AuthRouter
     * @param {AuthController} authController - Controller for handling authentication operations
     */
    constructor(private readonly authController: AuthController) {}

    /**
     * Initializes and configures authentication routes within the Fastify application
     *
     * Sets up the following routes:
     * - POST /identity/auth/signin: User signin endpoint (no authentication required)
     * - GET /identity/auth/me: User profile retrieval endpoint (authentication required)
     *
     * @param {FastifyApplicationInstance} fastify - The Fastify application instance to configure routes on
     *
     * @example
     * ```typescript
     * const authRouter = new AuthRouter(authController);
     * authRouter.initialize(fastify);
     * ```
     */
    initialize(fastify: FastifyApplicationInstance) {
        const ROUTE_PATHS = {
            SIGNIN: '/api/v1/identity/auth/signin',
            SIGNUP: '/api/v1/identity/auth/signup',
            GET_ME: '/api/v1/identity/auth/me',
            REFRESH_TOKEN: '/api/v1/identity/auth/refresh-token',
            UPDATE_PASSWORD: '/api/v1/identity/auth/password'
        };

        fastify.post(
            ROUTE_PATHS.SIGNIN,
            {
                schema: {
                    body: signinRequestSchema
                },
                config: {
                    auth: false
                }
            },
            this.authController.signin.bind(this.authController)
        );

        fastify.get(
            ROUTE_PATHS.GET_ME,
            {
                config: {
                    auth: true,
                    scope: TOKEN_SCOPES.ADMIN_ACCESS
                }
            },
            this.authController.getMe.bind(this.authController)
        );

        fastify.get(
            ROUTE_PATHS.REFRESH_TOKEN,
            {
                config: {
                    auth: true,
                    scope: TOKEN_SCOPES.ADMIN_REFRESH
                }
            },
            this.authController.refreshToken.bind(this.authController)
        );

        fastify.post(
            ROUTE_PATHS.SIGNUP,
            {
                schema: {
                    body: signupRequestSchema
                }
            },
            this.authController.signup.bind(this.authController)
        );

        fastify.put(
            ROUTE_PATHS.UPDATE_PASSWORD,
            {
                schema: {
                    body: updatePasswordRequestSchema
                },
                config: {
                    auth: true,
                    scope: TOKEN_SCOPES.ADMIN_ACCESS
                }
            },
            this.authController.updatePassword.bind(this.authController)
        );
    }
}
