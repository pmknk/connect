import { injectable } from 'inversify';
import { ModelStatic, Op } from 'sequelize';

import { ModelService } from '@avyyx/server-database';

import type { GetUsersRequestDto } from '../dtos/get-users.dto';
import type { User } from '../schemas/user.schema';
import { NotFoundError } from '@avyyx/server-utils';

/**
 * Service for handling user-related business logic
 *
 * This class provides methods for user management operations,
 * acting as an intermediary between controllers and the repository layer.
 */
@injectable()
export class UserService {
    private readonly userModel: ModelStatic<User>;

    /**
     * Creates a new UserService instance
     * @param {ModelService} modelService - Service for managing database models
     */
    constructor(private readonly modelService: ModelService) {
        this.userModel = this.modelService.getModel<User>('Users');
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
        });

        if (!user) {
            throw new NotFoundError('User not found');
        }

        return user;
    }
}
