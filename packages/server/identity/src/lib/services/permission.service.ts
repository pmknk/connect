import { injectable } from 'inversify';
import { ModelService } from '@content/server-database';
import { type ModelStatic } from 'sequelize';
import { type Permission } from '../schemas/permission.schema';
import { type Role } from '../schemas/role.schema';
import { type User } from '../schemas/user.schema';

/**
 * Service for managing permissions
 */
@injectable()
export class PermissionService {
    private readonly roleModel: ModelStatic<Role>;
    private readonly permissionModel: ModelStatic<Permission>;
    private readonly userModel: ModelStatic<User>;
    /**
     * Creates an instance of PermissionService
     * @param modelService - Service for managing database models
     */
    constructor(private readonly modelService: ModelService) {
        this.permissionModel =
            this.modelService.getModel<Permission>('Permissions');
        this.roleModel = this.modelService.getModel<Role>('Roles');
        this.userModel = this.modelService.getModel<User>('Users');
    }

    /**
     * Finds permissions for a specific user by their ID
     * @param userId - The unique identifier of the user
     * @returns Promise resolving to an array of permissions without role information
     */
    async findByUserId(userId: string): Promise<Permission[]> {
        const role = await this.roleModel.findOne({
            include: [
                {
                    model: this.userModel,
                    as: 'users',
                    where: {
                        id: userId
                    }
                }
            ]
        });

        return await this.permissionModel.findAll({
            include: [
                {
                    model: this.roleModel,
                    as: 'roles',
                    where: {
                        id: role?.id
                    }
                }
            ]
        });
    }
}
