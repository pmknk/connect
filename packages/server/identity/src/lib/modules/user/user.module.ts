import { SchemaRegistryService } from '@avyyx/server-database';
import { FastifyApplicationInstance } from '@avyyx/server-core';
import { injectable } from 'inversify';
import { UserSchema } from './user.schema';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { UserRouter } from './user.router';
import { UserService } from './user.service';

@injectable()
export class UserModule {
    constructor(
        private readonly schemaRegistryService: SchemaRegistryService
    ) {}

    async initialize(fastify: FastifyApplicationInstance) {
        this.schemaRegistryService.defineSchema(UserSchema);

        fastify.di.bind(UserController).toSelf();
        fastify.di.bind(UserRepository).toSelf();
        fastify.di.bind(UserService).toSelf();
        fastify.di.bind(UserRouter).toSelf();

        fastify.di.get(UserRouter).initialize(fastify);
    }
}
