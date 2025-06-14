import { EntryService } from "@avyyx/server-database";
import { injectable } from "inversify";
import { ROLE_CODES } from "../../constants";
import { User } from "../user/user.schema";
@injectable()
export class InitService {
    constructor(
        private readonly entryService: EntryService,
    ) {}

    async findAdminUser() {
        return await this.entryService.findOne<User>({
            schema: 'Users',
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
}