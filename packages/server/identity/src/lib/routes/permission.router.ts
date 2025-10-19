import { injectable } from 'inversify';
import { FastifyApplicationInstance } from '@connect/server-core';
import { PermissionController } from '../controllers/permission.controller';
import { TOKEN_SCOPES } from '../constants';

@injectable()
export class PermissionRouter {
    constructor(private readonly permissionController: PermissionController) {}

    async initialize(fastify: FastifyApplicationInstance) {
        const ROUTE_PATHS = {
            GET_PERMISSIONS: '/api/v1/identity/permissions'
        };

        fastify.get(
            ROUTE_PATHS.GET_PERMISSIONS,
            {
                config: {
                    auth: true,
                    scope: TOKEN_SCOPES.ADMIN_ACCESS
                }
            },
            this.permissionController.getPermissions.bind(
                this.permissionController
            )
        );
    }
}
