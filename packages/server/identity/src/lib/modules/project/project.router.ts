import { injectable } from 'inversify';
import { FastifyApplicationInstance } from '@avyyx/server-core';
import { ProjectController } from './project.controller';
import { TOKEN_SCOPES } from '../../constants';
import { createProjectRequestSchema } from './dto/create-project.dto';

@injectable()
export class ProjectRouter {
    constructor(private readonly projectController: ProjectController) {}

    async initialize(fastify: FastifyApplicationInstance) {
        const ROUTE_PATHS = {
            PROJECTS: '/identity/projects'
        };

        fastify.get(
            ROUTE_PATHS.PROJECTS,
            {
                config: {
                    auth: true,
                    scope: TOKEN_SCOPES.ADMIN_ACCESS
                }
            },
            this.projectController.findAllByUserId.bind(this.projectController)
        );

        fastify.post(
            ROUTE_PATHS.PROJECTS,
            {
                schema: {
                    body: createProjectRequestSchema
                },
                config: {
                    auth: true,
                    scope: TOKEN_SCOPES.ADMIN_ACCESS
                }
            },
            this.projectController.create.bind(this.projectController)
        );
    }
}
