import { SchemaRegistryService } from "@avyyx/server-database";
import { FastifyApplicationInstance } from "@avyyx/server-core";
import { injectable } from "inversify";
import { RoleSchema } from "./role.schema";
import { RoleRepository } from "./role.repository";
import { RoleService } from "./role.service";
import { RoleController } from "./role.controller";
import { RoleRouter } from "./role.router";

@injectable()
export class RoleModule {
    constructor(private readonly schemaRegistryService: SchemaRegistryService) {}

    async initialize(fastify: FastifyApplicationInstance) {
        this.schemaRegistryService.defineSchema(RoleSchema);

        fastify.di.bind(RoleService).toSelf();
        fastify.di.bind(RoleController).toSelf();
        fastify.di.bind(RoleRouter).toSelf();

        fastify.di.bind(RoleRepository).toSelf();

        fastify.di.get(RoleRouter).initialize(fastify);
    }
}