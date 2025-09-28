import { injectable } from 'inversify';
import { SigninService } from '../services/signin.service';

import { toSigninRequestDto } from '../dtos/signin.dto';

import type { FastifyRequest } from 'fastify';
import type { User } from '../schemas/user.schema';
import { type TokenResponseDto, toTokenResponseDto } from '../dtos/token.dto';
import { type UserResponseDto, toUserResponseDto } from '../dtos/user.dto';
import { type SignupResponseDto, toSignupRequestDto, toSignupResponseDto } from '../dtos/signup.dto';

/**
 * Controller responsible for handling authentication-related requests
 */
@injectable()
export class AuthController {
    /**
     * Creates an instance of AuthController
     * @param {SigninService} signinService - Service for handling signin operations
     */
    constructor(private readonly signinService: SigninService) {}

    /**
     * Handles user signin request
     * @param {FastifyRequest} request - The incoming request containing signin credentials
     * @returns {Promise<SigninResponseDto>} The signin response containing access and refresh tokens
     */
    async signin(request: FastifyRequest): Promise<TokenResponseDto> {
        return toTokenResponseDto(
            await this.signinService.signin(toSigninRequestDto(request))
        );
    }

    /**
     * Handles user signup request
     * @param {FastifyRequest} request - The incoming request containing signup credentials
     * @returns {Promise<TokenResponseDto>} The signup response containing access and refresh tokens
     */
    async signup(request: FastifyRequest): Promise<SignupResponseDto> {
        await this.signinService.signup(toSignupRequestDto(request));

        return toSignupResponseDto({ data: { success: true } });
    }

    /**
     * Handles user me request
     * @param request - The incoming request containing the user
     * @returns {Promise<UserDto>} The user response containing user details
     */
    async getMe(request: FastifyRequest): Promise<UserResponseDto> {
        return toUserResponseDto(
            (request as FastifyRequest & { user: User }).user
        );
    }

    /**
     * Refreshes the access token for a user
     * @param request - The incoming request containing the refresh token
     * @returns {Promise<TokenResponseDto>} The refreshed token response containing access and refresh tokens
     */
    async refreshToken(request: FastifyRequest): Promise<TokenResponseDto> {
        return toTokenResponseDto(
            await this.signinService.getTokensPair(
                (request as FastifyRequest & { user: User }).user.id
            )
        );
    }
}
