import { injectable } from "inversify";
import { SchemaService } from "@avyyx/server-database";
import { PermissionGroupSchema } from "./permission-group.schema";

@injectable()
export class PermissionGroupModule {
    constructor(private readonly schemaService: SchemaService) {}

    async initialize() {
        this.schemaService.defineSchema(PermissionGroupSchema);
    }
}