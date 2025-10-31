import {
    ConnectionService,
    ModelService,
    type Transaction
} from '@content/server-database';
import { ConflictError, NotFoundError } from '@content/server-utils';
import { injectable } from 'inversify';
import { type ModelStatic } from 'sequelize';

import { ROLE_CODES } from '../constants';
import { generateHash } from '../utils';

import { type UserRoles } from '../schemas/user-roles.schema';
import { type InitAdminUserDto } from '../dtos/init.dto';
import { type User } from '../schemas/user.schema';
import { type Role } from '../schemas/role.schema';

/**
 * Service responsible for initializing the system with an admin user
 */
@injectable()
export class InitService {
    private readonly userModel: ModelStatic<User>;
    private readonly roleModel: ModelStatic<Role>;
    private readonly userRolesModel: ModelStatic<UserRoles>;
    /**
     * Creates an instance of InitService
     * @param modelService - Service for model operations
     * @param connectionService - Service for database connection management
     */
    constructor(
        private readonly modelService: ModelService,
        private readonly connectionService: ConnectionService
    ) {
        this.userModel = this.modelService.getModel<User>('Users');
        this.roleModel = this.modelService.getModel<Role>('Roles');
        this.userRolesModel =
            this.modelService.getModel<UserRoles>('UserRoles');
    }

    /**
     * Validates if an admin user can be created
     * @throws {ConflictError} If admin user already exists
     * @throws {NotFoundError} If admin role is not found
     * @returns {Promise<Role>} The admin role
     */
    private async validateAdminCreation() {
        const existingAdmin = await this.userModel.findOne({
            include: [
                {
                    model: this.roleModel,
                    as: 'roles',
                    where: { slug: ROLE_CODES.ADMIN }
                }
            ]
        });
        if (existingAdmin) {
            throw new ConflictError('Admin user already exists');
        }

        const role = await this.roleModel.findOne({
            where: { slug: ROLE_CODES.ADMIN }
        });
        if (!role) {
            throw new NotFoundError('Admin role not found');
        }

        return role;
    }

    /**
     * Creates a new user with the specified role
     * @param dto - The admin user data transfer object
     * @param roleId - The ID of the role to assign
     * @param transaction - The database transaction to use
     * @returns {Promise<User>} The created user
     */
    private async createUserWithRole(
        dto: InitAdminUserDto,
        roleId: string,
        transaction: Transaction
    ) {
        const { salt, hash } = generateHash(dto.password);

        const user = await this.userModel.create({
            ...dto,
            fullName: 'Root User',
            password: hash,
            salt
        });

        await this.userRolesModel.create(
            {
                userId: user.id,
                roleId: roleId
            },
            { transaction }
        );

        return user;
    }

    /**
     * Creates the initial admin user for the system
     * @param dto - The admin user data transfer object
     * @throws {Error} If admin creation fails
     * @returns {Promise<User>} The created admin user
     */
    async createAdminUser(dto: InitAdminUserDto) {
        const role = await this.validateAdminCreation();
        const transaction = await this.connectionService.client.transaction();

        try {
            const user = await this.createUserWithRole(
                dto,
                role.id,
                transaction
            );
            await transaction.commit();
            return user;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}
