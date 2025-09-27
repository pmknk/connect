import { injectable } from 'inversify';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { UserService } from '../services/user.service';
import {
    type GetUsersResponseDto,
    toGetUsersResponseDto,
    toGetUsersRequestDto
} from '../dtos/get-users.dto';
import {
    type GetUserResponseDto,
    toGetUserRequestDto,
    toGetUserResponseDto
} from '../dtos/get-user.dto';
import { toUpdateUserRequestDto, toUpdateUserResponseDto } from '../dtos/update-user.dto';

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
    async getUsers(
        request: FastifyRequest,
        reply: FastifyReply
    ): Promise<GetUsersResponseDto> {
        const requestDto = toGetUsersRequestDto(request);
        const { count, users } = await this.userService.findAllPaginated(
            requestDto
        );

        return reply.status(200).send(
            toGetUsersResponseDto(users, {
                total: count,
                offset: requestDto.offset ?? 0,
                limit: requestDto.limit ?? 10
            })
        );
    }

    /**
     * Retrieves a user by their ID
     * @param request - The Fastify request object containing the user ID
     * @param reply - The Fastify reply object used to send the response
     * @returns {Promise<GetUserResponseDto>} The user response containing user details
     */
    async getUser(
        request: FastifyRequest,
        reply: FastifyReply
    ): Promise<GetUserResponseDto> {
        const requestDto = toGetUserRequestDto(request);
        const user = await this.userService.findById(
            requestDto.id,
            requestDto.include
        );
        return reply.status(200).send(toGetUserResponseDto(user));
    }

    /**
     * Updates a user
     * @param request - The Fastify request object containing the user update data
     * @param reply - The Fastify reply object used to send the response
     * @returns {Promise<GetUserResponseDto>} The user response containing user details
     */
    async updateUser(
        request: FastifyRequest,
        reply: FastifyReply
    ): Promise<GetUserResponseDto> {
        return reply
            .status(200)
            .send(
                toUpdateUserResponseDto(
                    await this.userService.update(
                        toUpdateUserRequestDto(request)
                    )
                )
            );
    }
}
