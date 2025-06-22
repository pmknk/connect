import { EntryService } from "@avyyx/server-database";
import { injectable } from "inversify";
import { Permission } from "./permission.schema";

@injectable()
export class PermissionRepository {
    /**
     * Creates an instance of PermissionRepository
     * @param entryService - Service for database entry operations
     */
    constructor(private readonly entryService: EntryService) {}

    /**
     * Finds permissions for a specific user by their ID
     * @param userId - The unique identifier of the user
     * @returns Promise resolving to an array of permissions with role information
     */
    async findByUserId(userId: string) {
        return await this.entryService.find<Permission>({
            schema: 'Permissions',
            include: [
                {
                    association: 'Roles',
                    as: 'roles',
                    required: true,
                    include: [
                        {
                            association: 'Users',
                            as: 'users',
                            required: true,
                            where: {
                                id: userId
                            }
                        }
                    ]
                }
            ]
        });
    }
}   