import { SchemaService } from "@avyyx/server-database";
import { injectable } from "inversify";
import { RoleSchema } from "./role.schema";

@injectable()
export class RoleModule {
    constructor(private readonly schemaService: SchemaService) {}

    async initialize() {
        this.schemaService.defineSchema(RoleSchema);
    }
}