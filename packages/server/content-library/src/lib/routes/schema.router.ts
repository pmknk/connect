import { injectable } from 'inversify';
import { FastifyApplicationInstance } from '@content/server-core';
import { SchemaController } from '../controllers/schema.controller';

@injectable()
export class SchemaRouter {
    constructor(private readonly schemaController: SchemaController) {}

    initialize(fastify: FastifyApplicationInstance) {
        const ROUTE_PATHS = {
            GET_SCHEMAS: '/api/v1/content-library/schemas'
        };

        fastify.get(
            ROUTE_PATHS.GET_SCHEMAS,
            {
                config: {
                    auth: true
                }
            },
            this.schemaController.getSchemas.bind(this.schemaController)
        );
    }
}


