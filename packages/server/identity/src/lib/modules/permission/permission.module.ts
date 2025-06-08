import { injectable } from "inversify";
import { SchemaService } from "@avyyx/server-database";
import { PermissionSchema } from "./permission.schema";

@injectable()
export class PermissionModule {
    constructor(private readonly schemaService: SchemaService) {}

    async initialize() {
        this.schemaService.defineSchema(PermissionSchema);
    }
}