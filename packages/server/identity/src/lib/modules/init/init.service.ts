import { ConnectionService } from '@avyyx/server-database';
import { ConflictError, NotFoundError } from '@avyyx/server-utils';
import { injectable } from 'inversify';

import { ROLE_CODES } from '../../constants';
import { UserRepository } from '../user/user.repository';
import { RoleRepository } from '../role/role.repository';
import { InitAdminUserDto } from './dto/init.dto';
import { generateHash } from '../../utils';

/**
 * Service responsible for initializing the system with an admin user
 */
@injectable()
export class InitService {
    /**
     * Creates an instance of InitService
     * @param userRepository - Repository for user operations
     * @param roleRepository - Repository for role operations
     * @param connectionService - Service for database connection management
     */
    constructor(
        private readonly userRepository: UserRepository,
        private readonly roleRepository: RoleRepository,
        private readonly connectionService: ConnectionService
    ) {}

    /**
     * Validates if an admin user can be created
     * @throws {ConflictError} If admin user already exists
     * @throws {NotFoundError} If admin role is not found
     * @returns {Promise<Role>} The admin role
     */
    private async validateAdminCreation() {
        const existingAdmin = await this.userRepository.findByRoleSlug(
            ROLE_CODES.ADMIN
        );
        if (existingAdmin) {
            throw new ConflictError('Admin user already exists');
        }

        const role = await this.roleRepository.findBySlug(ROLE_CODES.ADMIN);
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
        transaction: any
    ) {
        const { salt, hash } = generateHash(dto.password);

        const user = await this.userRepository.create(
            {
                ...dto,
                fullName: 'Root User',
                password: hash,
                salt
            },
            transaction
        );

        await this.userRepository.addRole(user.id, roleId, transaction);

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
