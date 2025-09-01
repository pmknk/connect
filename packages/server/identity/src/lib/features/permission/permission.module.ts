import { injectable } from "inversify";
import { SchemaRegistryService } from "@avyyx/server-database";
import { PermissionSchema } from "./permission.schema";
import { FastifyApplicationInstance } from "@avyyx/server-core";
import { PermissionService } from "./permission.service";
import { PermissionRepository } from "./permission.repository";
import { PermissionController } from "./permission.controller";
import { PermissionRouter } from "./permission.router";

/**
 * Module responsible for managing permission-related operations and schema registration
 */
@injectable()
export class PermissionModule {
    /**
     * Creates an instance of PermissionModule
     * @param {SchemaRegistryService} schemaRegistryService - Service for registering database schemas
     */
    constructor(private readonly schemaRegistryService: SchemaRegistryService) {}

    /**
     * Initializes the permission module by registering the permission schema
     * @returns {Promise<void>} A promise that resolves when the schema is registered
     */
    async initialize(fastify: FastifyApplicationInstance) {
        this.schemaRegistryService.defineSchema(PermissionSchema);

        fastify.di.bind(PermissionRepository).toSelf();
        fastify.di.bind(PermissionService).toSelf();
        fastify.di.bind(PermissionController).toSelf();
        fastify.di.bind(PermissionRouter).toSelf();

        fastify.di.get(PermissionRouter).initialize(fastify);
    }
}