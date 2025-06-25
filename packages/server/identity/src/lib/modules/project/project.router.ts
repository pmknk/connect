import { injectable } from 'inversify';
import { ProjectController } from './project.controller';
import { FastifyApplicationInstance } from '@avyyx/server-core';
import { TOKEN_SCOPES } from '../../constants';

@injectable()
export class ProjectRouter {
    constructor(private readonly projectController: ProjectController) {}

    async initialize(fastify: FastifyApplicationInstance) {
        const ROUTE_PATHS = {
            GET_ALL_PROJECTS: '/identity/projects'
        };

        fastify.get(
            ROUTE_PATHS.GET_ALL_PROJECTS,
            {
                config: {
                    auth: true,
                    scope: TOKEN_SCOPES.ADMIN_ACCESS
                }
            },
            this.projectController.findAllByUserId.bind(this.projectController)
        );
    }
}
