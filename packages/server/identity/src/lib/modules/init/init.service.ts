import { ConnectionService, ModelService } from "@avyyx/server-database";
import { injectable } from "inversify";
import { Model, ModelStatic } from "sequelize";
import { ROLE_CODES } from "../../constants";
import { User } from "../user/user.schema";
import { InitDto } from "./dto/init.dto";

@injectable()
export class InitService {
    private readonly userModel: ModelStatic<Model<User>>;

    constructor(
        private readonly modelService: ModelService,
        private readonly connectionService: ConnectionService
    ) {
        this.userModel = this.modelService.getModel('User');
    }

    async findAdminUser() {
        return await this.userModel.findOne({
            include: [
                {
                    association: 'Roles',
                    where: {
                        code: ROLE_CODES.ADMIN
                    }
                }
            ]
        })
    }

    

    async createAdminUser(dto: InitDto) {
        const transaction = await this.connectionService.transaction();

        try {
            
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}