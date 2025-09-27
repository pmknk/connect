import { injectable } from 'inversify';
import { ModelStatic, Op } from 'sequelize';
import { NotFoundError } from '@avyyx/server-utils';
import { ConnectionService, ModelService } from '@avyyx/server-database';

import type { User } from '../schemas/user.schema';

import type { GetUsersRequestDto } from '../dtos/get-users.dto';
import type { UpdateUserRequestDto } from '../dtos/update-user.dto';
import { ProjectUsers } from '../schemas/project-users.schema';
import { UserRoles } from '../schemas/user-roles.schema';

/**
 * Service for handling user-related business logic
 *
 * This class provides methods for user management operations,
 * acting as an intermediary between controllers and the repository layer.
 */
@injectable()
export class UserService {
    private readonly userModel: ModelStatic<User>;
    private readonly projectUsersModel: ModelStatic<ProjectUsers>;
    private readonly userRolesModel: ModelStatic<UserRoles>;

    /**
     * Creates a new UserService instance
     * @param {ModelService} modelService - Service for managing database models
     */
    constructor(
        private readonly modelService: ModelService,
        private readonly connectionService: ConnectionService
    ) {
        this.userModel = this.modelService.getModel<User>('Users');
        this.projectUsersModel =
            this.modelService.getModel<ProjectUsers>('ProjectUsers');
        this.userRolesModel =
            this.modelService.getModel<UserRoles>('UserRoles');
    }

    /**
     * Retrieves a paginated list of users
     *
     * Fetches users from the database with pagination support,
     * including offset and limit parameters for efficient data retrieval.
     *
     * @param {UsersRequestDto} dto - Data transfer object containing pagination parameters
     * @returns {Promise<{ count: number; users: User[] }>} Promise resolving to an object containing the total count and array of users
     *
     * @example
     * ```typescript
     * const userService = new UserService(userRepository);
     * const result = await userService.getUsers({ offset: 0, limit: 10 });
     * console.log(`Found ${result.count} users`);
     * ```
     */
    async findAllPaginated(
        dto: GetUsersRequestDto
    ): Promise<{ count: number; users: User[] }> {
        const { search, ...rest } = dto;
        const where = {
            [Op.or]: [
                { fullName: { [Op.iLike]: `%${search}%` } },
                { email: { [Op.iLike]: `%${search}%` } }
            ]
        };

        const count = await this.userModel.count({
            where
        });

        const users = await this.userModel.findAll({
            ...rest,
            where
        });

        return { count, users };
    }

    /**
     * Finds a user by their ID
     * @param id - The unique identifier of the user.
     * @param include - The associations to include.
     * @returns A promise that resolves to the User object.
     */
    async findById(
        id: string,
        include?: { association: string }[]
    ): Promise<User> {
        const user = await this.userModel.findOne({
            where: { id },
            include
        });

        if (!user) {
            throw new NotFoundError('User not found');
        }

        return user;
    }

    /**
     * Updates a user
     * @param dto - The update user request dto
     * @returns The updated user
     */
    async update(dto: UpdateUserRequestDto): Promise<User> {
        const user = await this.userModel.findByPk(dto.id, {
            include: [
                {
                    association: 'projects'
                },
                {
                    association: 'roles'
                }
            ]
        });
        if (!user) {
            throw new NotFoundError('User not found');
        }
        const transaction = await this.connectionService.client.transaction();
        try {
            const { id, email, fullName, projectIds, roleId } = dto;
            const existedProjects = user.projects;
            const existedRole = user.roles?.[0];

            if (existedRole?.id !== roleId) {
                await this.userRolesModel.destroy({
                    where: { userId: id },
                    transaction
                });
                if (roleId) {
                    await this.userRolesModel.create(
                        { userId: id, roleId },
                        { transaction }
                    );
                }
            }
            const existedProjectIds = (existedProjects ?? []).map((p) => p.id);
            const dtoProjectIds = projectIds ?? [];

            const projectIdsToAdd = dtoProjectIds.filter(
                (pid) => !existedProjectIds.includes(pid)
            );
            const projectIdsToRemove = existedProjectIds.filter(
                (pid) => !dtoProjectIds.includes(pid)
            );

            if (projectIdsToAdd.length > 0) {
                await this.projectUsersModel.bulkCreate(
                    projectIdsToAdd.map((projectId) => ({
                        userId: id,
                        projectId
                    })),
                    { transaction }
                );
            }

            if (projectIdsToRemove.length > 0) {
                await this.projectUsersModel.destroy({
                    where: {
                        userId: id,
                        projectId: { [Op.in]: projectIdsToRemove }
                    },
                    transaction
                });
            }

            await user.update({ email, fullName }, { transaction });
            await transaction.commit();

            await user.reload({
                include: [{ association: 'projects' }, { association: 'roles' }]
            });
            return user;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}
