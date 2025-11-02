import { injectable } from 'inversify';
import { FastifyApplicationInstance } from '@content/server-core';
import { ProjectController } from '../controllers/project.controller';
import { TOKEN_SCOPES } from '../constants';
import { createProjectRequestSchema } from '../dtos/create-project.dto';
import { getProjectRequestSchema } from '../dtos/get-project.dto';

@injectable()
export class ProjectRouter {
    constructor(private readonly projectController: ProjectController) {}

    async initialize(fastify: FastifyApplicationInstance) {
        const ROUTE_PATHS = {
            PROJECTS: '/api/v1/identity/projects'
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

        fastify.get(
            `${ROUTE_PATHS.PROJECTS}/:id`,
            {
                schema: getProjectRequestSchema,
                config: {
                    auth: true,
                    scope: TOKEN_SCOPES.ADMIN_ACCESS
                }
            },
            this.projectController.findById.bind(this.projectController)
        );
    }
}
