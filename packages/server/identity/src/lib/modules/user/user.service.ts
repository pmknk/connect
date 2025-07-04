import { injectable } from "inversify";
import { UserRepository } from "./user.repository";
import { UsersRequestDto } from "./dtos/users.dto";

/**
 * Service for handling user-related business logic
 * 
 * This class provides methods for user management operations,
 * acting as an intermediary between controllers and the repository layer.
 */
@injectable()
export class UserService {
    /**
     * Creates a new UserService instance
     * @param {UserRepository} userRepository - Repository for user data operations
     */
    constructor(private readonly userRepository: UserRepository) {}

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
    async getUsers(dto: UsersRequestDto) {
        return await this.userRepository.findAllPaginated({
            ...dto
        })
    }
    
}