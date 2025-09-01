import { injectable } from "inversify";
import { RoleController } from "./role.controller";
import { FastifyApplicationInstance } from "@avyyx/server-core";
import { TOKEN_SCOPES } from "../../constants";

/**
 * Router for handling role-related API endpoints.
 */
@injectable()
export class RoleRouter {
    /**
     * Creates an instance of RoleRouter.
     * @param roleController - The controller used to handle role-related requests.
     */
    constructor(private readonly roleController: RoleController) {}

    /**
     * Initializes the role routes on the provided Fastify instance.
     * @param fastify - The Fastify application instance.
     */
    initialize(fastify: FastifyApplicationInstance) {
        /**
         * Route paths for role endpoints.
         */
        const ROUTE_PATHS = {
            GET_ROLES: '/api/v1/identity/roles'
        };

        /**
         * GET /api/v1/identity/roles
         * 
         * Retrieves all roles.
         * Requires authentication and admin access scope.
         */
        fastify.get(
            ROUTE_PATHS.GET_ROLES,
            {
                config: {
                    auth: true,
                    scope: TOKEN_SCOPES.ADMIN_ACCESS
                }
            },
            this.roleController.getRoles.bind(this.roleController)
        );
    }
}