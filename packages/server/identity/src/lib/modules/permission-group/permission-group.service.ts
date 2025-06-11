import { ModelService } from "@avyyx/server-database";
import { injectable } from "inversify";
import { Model, ModelStatic, Transaction } from "sequelize";
import type { PermissionGroup, PermissionGroupAttributes } from "./permission-group.schema";

@injectable()
export class PermissionGroupService {
    private readonly permissionGroupModel: ModelStatic<Model<PermissionGroup>>;
    constructor(private readonly modelService: ModelService) {
        this.permissionGroupModel = this.modelService.getModel('PermissionGroup');
    }
}