import { FastifyApplicationInstance } from '@avyyx/server-core';
import { injectable } from 'inversify';
import { UserController } from '../controllers/user.controller';
import { getUsersRequestSchema } from '../dtos/get-users.dto';
import { TOKEN_SCOPES } from '../constants';
import { getUserRequestSchema } from '../dtos/get-user.dto';
import { updateUserRequestSchema } from '../dtos/update-user.dto';

/**
 * Router responsible for handling user-related routes
 *
 * This class manages the routing configuration for user endpoints,
 * including user retrieval and management routes.
 */
@injectable()
export class UserRouter {
    /**
     * Creates an instance of UserRouter
     * @param {UserController} userController - Controller for handling user operations
     */
    constructor(private readonly userController: UserController) {}

    /**
     * Initializes and configures user routes within the Fastify application
     *
     * Sets up the following routes:
     * - GET /identity/users: User retrieval endpoint (authentication required)
     *
     * @param {FastifyApplicationInstance} fastify - The Fastify application instance to configure routes on
     *
     * @example
     * ```typescript
     * const userRouter = new UserRouter(userController);
     * userRouter.initialize(fastify);
     * ```
     */
    initialize(fastify: FastifyApplicationInstance) {
        const ROUTE_PATHS = {
            USERS: '/api/v1/identity/users'
        };

        fastify.get(
            ROUTE_PATHS.USERS,
            {
                schema: {
                    querystring: getUsersRequestSchema
                },
                config: {
                    auth: true,
                    scope: TOKEN_SCOPES.ADMIN_ACCESS
                }
            },
            this.userController.getUsers.bind(this.userController)
        );

        fastify.get(
            `${ROUTE_PATHS.USERS}/:id`,
            {
                schema: getUserRequestSchema,
                config: {
                    auth: true,
                    scope: TOKEN_SCOPES.ADMIN_ACCESS
                }
            },
            this.userController.getUser.bind(this.userController)
        );

        fastify.put(
            ROUTE_PATHS.USERS,
            {
                schema: updateUserRequestSchema
            },
            this.userController.updateUser.bind(this.userController)
        );
    }
}
