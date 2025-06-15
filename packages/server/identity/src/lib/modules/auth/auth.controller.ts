import { injectable } from 'inversify';
import { SigninService } from './services/signin.service';
import { FastifyRequest } from 'fastify';
import { SigninDto, SigninResponseDto, toSigninResponseDto } from './dtos/signin.dto';

/**
 * Controller responsible for handling authentication-related requests
 */
@injectable()
export class AuthController {
    /**
     * Creates an instance of AuthController
     * @param {SigninService} signinService - Service for handling signin operations
     */
    constructor(
        private readonly signinService: SigninService
    ) {}

    /**
     * Handles user signin request
     * @param {FastifyRequest} request - The incoming request containing signin credentials
     * @returns {Promise<SigninResponseDto>} The signin response containing access and refresh tokens
     */
    async signin(request: FastifyRequest): Promise<SigninResponseDto> {
        return toSigninResponseDto(
            await this.signinService.signin(request.body as SigninDto)
        );
    }
}
