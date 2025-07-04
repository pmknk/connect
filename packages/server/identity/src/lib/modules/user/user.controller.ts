import { injectable } from "inversify";
import { FastifyRequest } from "fastify";
import { UserService } from "./user.service";
import { toUsersResponseDto, type UsersResponseDto } from "./dtos/users.dto";
import { toUsersRequestDto } from "./dtos/users.dto";

/**
 * Controller class for handling user-related HTTP requests
 */
@injectable()
export class UserController {
    /**
     * Creates an instance of UserController
     * @param userService - Service for user-related business logic
     */
    constructor(private readonly userService: UserService) {}

    /**
     * Retrieves a paginated list of users
     * @param request - The Fastify request object containing query parameters
     * @returns {Promise<UsersResponseDto>} A paginated response containing users and metadata
     */
    async getUsers(request: FastifyRequest): Promise<UsersResponseDto> {
        const requestDto = toUsersRequestDto(request);
        const { count, users } = await this.userService.getUsers(requestDto);

        return toUsersResponseDto(
            users,
            {
                total: count,
                offset: requestDto.offset ?? 0,
                limit: requestDto.limit ?? 10
            }
        );
    }
}
