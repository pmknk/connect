import { SchemaRegistryService } from "@avyyx/server-database";
import { injectable } from "inversify";
import { UserSchema } from "./user.schema";

@injectable()
export class UserModule {
    constructor(private readonly schemaRegistryService: SchemaRegistryService) {}

    async initialize() {
        this.schemaRegistryService.defineSchema(UserSchema);
    }
}