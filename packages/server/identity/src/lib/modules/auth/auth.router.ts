import { injectable } from "inversify";
import { AuthController } from "./auth.controller";
import { FastifyApplicationInstance } from "@avyyx/server-core";
import { TOKEN_SCOPES } from "../../constants";

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
            SIGNIN: '/identity/auth/signin',
            GET_ME: '/identity/auth/me'
        }

        fastify.post(
            ROUTE_PATHS.SIGNIN,
            {
                schema: {
                    body: {
                        type: 'object',
                        required: ['email', 'password'],
                        properties: {
                            email: { type: 'string', format: 'email' },
                            password: { type: 'string', minLength: 8 }
                        }
                    }
                },
                config: {
                    auth: false,
                }
            },
            this.authController.signin.bind(this.authController)
        )

        fastify.get(
            ROUTE_PATHS.GET_ME,
            {
                config: {
                    auth: true,
                    scope: TOKEN_SCOPES.ADMIN_ACCESS
                }
            },
            this.authController.getMe.bind(this.authController)
        )
    }
}