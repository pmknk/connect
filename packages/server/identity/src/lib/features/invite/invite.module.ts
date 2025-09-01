import { FastifyApplicationInstance } from '@avyyx/server-core';
import { SchemaRegistryService } from '@avyyx/server-database';
import { injectable } from 'inversify';
import { InviteSchema } from './invite.schema';
import { InviteController } from './invite.controller';
import { InviteRouter } from './invite.router';
import { InviteService } from './invite.service';
import { InviteRepository } from './invite.repository';

@injectable()
export class InviteModule {
    constructor(
        private readonly schemaRegistryService: SchemaRegistryService
    ) {}

    async initialize(fastify: FastifyApplicationInstance) {
        this.schemaRegistryService.defineSchema(InviteSchema);

        fastify.di.bind(InviteController).toSelf();
        fastify.di.bind(InviteRouter).toSelf();
        fastify.di.bind(InviteService).toSelf();
        fastify.di.bind(InviteRepository).toSelf();

        fastify.di.get(InviteRouter).initialize(fastify);
    }
}