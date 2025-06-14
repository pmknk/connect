import { SchemaRegistryService } from "@avyyx/server-database";
import { FastifyApplicationInstance } from "@avyyx/server-core";
import { injectable } from "inversify";
import { RoleSchema } from "./role.schema";
import { RoleRepository } from "./role.repository";

@injectable()
export class RoleModule {
    constructor(private readonly schemaRegistryService: SchemaRegistryService) {}

    async initialize(fastify: FastifyApplicationInstance) {
        this.schemaRegistryService.defineSchema(RoleSchema);

        fastify.di.bind(RoleRepository).toSelf();
    }
}