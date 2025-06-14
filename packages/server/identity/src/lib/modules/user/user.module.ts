import { SchemaRegistryService } from "@avyyx/server-database";
import { FastifyApplicationInstance } from "@avyyx/server-core";
import { injectable } from "inversify";
import { UserSchema } from "./user.schema";
import { UserRepository } from "./user.repository";

@injectable()
export class UserModule {
    constructor(private readonly schemaRegistryService: SchemaRegistryService) {}

    async initialize(fastify: FastifyApplicationInstance) {
        this.schemaRegistryService.defineSchema(UserSchema);

        fastify.di.bind(UserRepository).toSelf();
    }
}