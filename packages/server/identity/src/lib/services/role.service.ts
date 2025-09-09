import { injectable } from 'inversify';
import { ModelService } from '@avyyx/server-database';
import { type ModelStatic } from 'sequelize';
import { type Role } from '../schemas/role.schema';

/**
 * Service for handling business logic related to roles.
 */
@injectable()
export class RoleService {
    private readonly roleModel: ModelStatic<Role>;
    /**
     * Creates an instance of RoleService.
     * @param modelService - The model service used to interact with role data.
     */
    constructor(private readonly modelService: ModelService) {
        this.roleModel = this.modelService.getModel<Role>('Roles');
    }

    /**
     * Retrieves all roles from the repository.
     * @returns A promise that resolves to an array of Role entities.
     */
    async findAll(): Promise<Role[]> {
        return await this.roleModel.findAll();
    }
}
