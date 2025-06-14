import { SchemaRegistryService } from "@avyyx/server-database";
import { injectable } from "inversify";
import { RoleSchema } from "./role.schema";

@injectable()
export class RoleModule {
    constructor(private readonly schemaRegistryService: SchemaRegistryService) {}

    async initialize() {
        this.schemaRegistryService.defineSchema(RoleSchema);
    }
}