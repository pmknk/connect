import { injectable } from 'inversify';
import { ModelStatic, Op } from 'sequelize';
import type { Transaction } from 'sequelize';
import { NotFoundError } from '@connect/server-utils';
import { ConnectionService, ModelService } from '@connect/server-database';

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
            include,
            paranoid: false
        });

        if (!user) {
            throw new NotFoundError('User not found');
        }

        return user;
    }

    /**
     * Deletes a user
     * @param id - The unique identifier of the user.
     * @returns A promise that resolves when the user is deleted
     */
    async delete(id: string): Promise<void> {
        await this.userModel.destroy({ where: { id } });
    }

    /**
     * Restores a deleted user
     * @param id - The unique identifier of the user.
     * @returns A promise that resolves when the user is restored
     */
    async restore(id: string): Promise<void> {
        await this.userModel.restore({ where: { id } });
    }

    /**
     * Updates a user
     * @param dto - The update user request dto
     * @returns The updated user
     */
    async update(dto: UpdateUserRequestDto): Promise<User> {
        const user = await this.findUserOrThrow(dto.id);
        const transaction = await this.connectionService.client.transaction();
        try {
            const { id, email, fullName, projectIds, roleId } = dto;

            const existedProjectIds = (user.projects ?? []).map((p) => p.id);
            const desiredProjectIds = projectIds ?? [];
            const existedRoleId = user.roles?.[0]?.id;

            await this.updateUserRoleIfChanged(
                id,
                existedRoleId,
                roleId,
                transaction
            );

            const { toAdd, toRemove } = this.diffProjects(
                existedProjectIds,
                desiredProjectIds
            );

            if (toAdd.length > 0) {
                await this.addProjects(id, toAdd, transaction);
            }

            if (toRemove.length > 0) {
                await this.removeProjects(id, toRemove, transaction);
            }

            await user.update({ email, fullName }, { transaction });
            await transaction.commit();

            return await this.reloadUserWithAssociations(user);
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    /**
     * Builds the default include array for user queries.
     * Ensures `projects` and `roles` associations are eagerly loaded.
     * @returns Array of Sequelize include association descriptors
     */
    private defaultUserInclude(): { association: string }[] {
        return [{ association: 'projects' }, { association: 'roles' }];
    }

    /**
     * Finds a user by primary key with default includes or throws if missing.
     * @param id - User identifier (primary key)
     * @throws NotFoundError if user is not found
     * @returns The found user instance with `projects` and `roles` loaded
     */
    private async findUserOrThrow(id: string): Promise<User> {
        const user = await this.userModel.findByPk(id, {
            include: this.defaultUserInclude()
        });
        if (!user) {
            throw new NotFoundError('User not found');
        }
        return user;
    }

    /**
     * Updates user role membership if the role has changed.
     * Replaces existing user-role links with the provided role inside a transaction.
     * @param userId - The user id to update
     * @param currentRoleId - The currently assigned role id (if any)
     * @param newRoleId - The desired new role id (if any)
     * @param transaction - The Sequelize transaction to use
     */
    private async updateUserRoleIfChanged(
        userId: string,
        currentRoleId: string | undefined,
        newRoleId: string | undefined,
        transaction: Transaction
    ): Promise<void> {
        if (currentRoleId === newRoleId) {
            return;
        }

        await this.userRolesModel.destroy({
            where: { userId },
            transaction
        });

        if (newRoleId) {
            await this.userRolesModel.create(
                { userId, roleId: newRoleId },
                { transaction }
            );
        }
    }

    /**
     * Computes the difference between current and desired project id lists.
     * @param currentIds - Currently linked project ids
     * @param desiredIds - Desired project ids after update
     * @returns Object with `toAdd` and `toRemove` arrays
     */
    private diffProjects(
        currentIds: string[],
        desiredIds: string[]
    ): { toAdd: string[]; toRemove: string[] } {
        const toAdd = desiredIds.filter((id) => !currentIds.includes(id));
        const toRemove = currentIds.filter((id) => !desiredIds.includes(id));
        return { toAdd, toRemove };
    }

    /**
     * Adds links between a user and multiple projects.
     * @param userId - The user id to link
     * @param projectIds - Project ids to add
     * @param transaction - The Sequelize transaction to use
     */
    private async addProjects(
        userId: string,
        projectIds: string[],
        transaction: Transaction
    ): Promise<void> {
        await this.projectUsersModel.bulkCreate(
            projectIds.map((projectId) => ({ userId, projectId })),
            { transaction }
        );
    }

    /**
     * Removes links between a user and multiple projects.
     * @param userId - The user id to unlink
     * @param projectIds - Project ids to remove
     * @param transaction - The Sequelize transaction to use
     */
    private async removeProjects(
        userId: string,
        projectIds: string[],
        transaction: Transaction
    ): Promise<void> {
        await this.projectUsersModel.destroy({
            where: {
                userId,
                projectId: { [Op.in]: projectIds }
            },
            transaction
        });
    }

    /**
     * Reloads a user instance with default associations.
     * @param user - The user instance to reload
     * @returns The reloaded user instance
     */
    private async reloadUserWithAssociations(user: User): Promise<User> {
        await user.reload({ include: this.defaultUserInclude() });
        return user;
    }
}
