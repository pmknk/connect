import { injectable } from 'inversify';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { UserService } from '../services/user.service';
import { type GetUsersResponseDto, toGetUsersResponseDto } from '../dtos/get-users.dto';
import { toGetUsersRequestDto } from '../dtos/get-users.dto';

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
     * @param reply - The Fastify reply object used to send the response
     * @returns {Promise<GetUsersResponseDto>} A paginated response containing users and metadata
     */
    async getUsers(request: FastifyRequest, reply: FastifyReply): Promise<GetUsersResponseDto> {
        const requestDto = toGetUsersRequestDto(request);
        const { count, users } = await this.userService.findAllPaginated(
            requestDto
        );

        return reply
            .status(200)
            .send(toGetUsersResponseDto(users, {
                total: count,
                offset: requestDto.offset ?? 0,
                limit: requestDto.limit ?? 10
            })
        );
    }
}
