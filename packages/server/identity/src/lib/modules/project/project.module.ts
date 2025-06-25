import { SchemaRegistryService } from '@avyyx/server-database';
import { injectable } from 'inversify';
import { ProjectSchema } from './project.schema';
import { FastifyApplicationInstance } from '@avyyx/server-core';
import { ProjectService } from './project.service';
import { ProjectRepository } from './project.repository';
import { ProjectController } from './project.controller';
import { ProjectRouter } from './project.router';

@injectable()
export class ProjectModule {
    constructor(
        private readonly schemaRegistryService: SchemaRegistryService
    ) {}

    async initialize(fastify: FastifyApplicationInstance) {
        this.schemaRegistryService.defineSchema(ProjectSchema);

        fastify.di.bind(ProjectService).toSelf();
        fastify.di.bind(ProjectRepository).toSelf();
        fastify.di.bind(ProjectController).toSelf();
        fastify.di.bind(ProjectRouter).toSelf();

        fastify.di.get(ProjectRouter).initialize(fastify);
    }
}
