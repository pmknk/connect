import { injectable } from "inversify";
import { SchemaRegistryService } from "@avyyx/server-database";
import { PermissionGroupSchema } from "./permission-group.schema";

@injectable()
export class PermissionGroupModule {
    constructor(private readonly schemaRegistryService: SchemaRegistryService) {}

    async initialize() {
        this.schemaRegistryService.defineSchema(PermissionGroupSchema);
    }
}