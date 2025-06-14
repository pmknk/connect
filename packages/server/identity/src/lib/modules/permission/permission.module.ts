import { injectable } from "inversify";
import { SchemaRegistryService } from "@avyyx/server-database";
import { PermissionSchema } from "./permission.schema";

@injectable()
export class PermissionModule {
    constructor(private readonly schemaRegistryService: SchemaRegistryService) {}

    async initialize() {
        this.schemaRegistryService.defineSchema(PermissionSchema);
    }
}