import { SchemaService } from "@avyyx/server-database";
import { injectable } from "inversify";
import { UserSchema } from "./user.schema";

@injectable()
export class UserModule {
    constructor(private readonly schemaService: SchemaService) {}

    async initialize() {
        this.schemaService.defineSchema(UserSchema);
    }
}