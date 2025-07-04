import { FastifyApplicationInstance } from "@avyyx/server-core";
import { injectable } from "inversify";
import { UserController } from "./user.controller";
import { usersRequestSchema } from "./dtos/users.dto";
import { TOKEN_SCOPES } from "../../constants";

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
            GET_USERS: '/identity/users'
        }

        fastify.get(
            ROUTE_PATHS.GET_USERS,
            {
                schema: {
                    querystring: usersRequestSchema
                },
                config: {
                    auth: true,
                    scope: TOKEN_SCOPES.ADMIN_ACCESS
                }
            },
            this.userController.getUsers.bind(this.userController)
        );
    }
}