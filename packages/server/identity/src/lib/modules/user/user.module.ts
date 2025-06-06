import { SchemaService } from "@avyyx/server-database";
import { injectable } from "inversify";
import { UserSchema } from "./user.schema";

@injectable()
export class UserModule {
    constructor(private readonly schemaService: SchemaService) {
        this.schemaService.defineSchema(UserSchema);
    }
}