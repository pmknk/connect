import { injectable } from 'inversify';
import { ModelService } from '@avyyx/server-database';
import { type ModelStatic } from 'sequelize';
import { type Permission } from '../schemas/permission.schema';

/**
 * Service for managing permissions
 */
@injectable()
export class PermissionService {
    private readonly permissionModel: ModelStatic<Permission>;
    /**
     * Creates an instance of PermissionService
     * @param modelService - Service for managing database models
     */
    constructor(private readonly modelService: ModelService) {
        this.permissionModel =
            this.modelService.getModel<Permission>('Permissions');
    }

    /**
     * Finds permissions for a specific user by their ID
     * @param userId - The unique identifier of the user
     * @returns Promise resolving to an array of permissions without role information
     */
    async findByUserId(userId: string): Promise<Permission[]> {
        return await this.permissionModel.findAll({
            where: {
                roles: {
                    users: {
                        id: userId
                    }
                }
            }
        });
    }
}
