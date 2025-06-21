import { UnauthorizedError } from '@avyyx/server-utils';
import { injectable } from 'inversify';
import { JwtService } from './jwt.service';
import { UserRepository } from '../../user/user.repository';
import { SigninDto } from '../dtos/signin.dto';
import { generateHash } from '../../../utils';
import { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN, TOKEN_SCOPES } from '../../../constants';

/**
 * Service for handling JWT token signing and verification.
 */
export interface TokensPair {
    accessToken: string;
    accessTokenExpiresIn: number;
    refreshToken: string;
    refreshTokenExpiresIn: number;
}

@injectable()
export class SigninService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) {}

    /**
     * Signs in a user and returns a tokens pair.
     * @param dto - The signin DTO.
     * @returns The tokens pair.
     */
    async signin(dto: SigninDto) {
        const user = await this.userRepository.findByEmail(dto.email);

        if (!user) throw new UnauthorizedError('Invalid email or password');

        const { hash } = generateHash(dto.password, user.salt);

        if (hash !== user.password)
            throw new UnauthorizedError('Invalid email or password');

        return await this.getTokensPair(user.id);
    }

    /**
     * Generates access and refresh tokens for a user.
     * @param {string} userId - The ID of the user.
     * @returns {Promise<TokensPair>} - Returns an object containing access and refresh tokens along with their expiration times.
     */
    private async getTokensPair(userId: string): Promise<TokensPair> {
        const tokenConfigs = [
            {
                scope: TOKEN_SCOPES.ADMIN_ACCESS,
                expiresIn: ACCESS_TOKEN_EXPIRES_IN,
                tokenKey: 'accessToken',
                expiresInKey: 'accessTokenExpiresIn'
            },
            {
                scope: TOKEN_SCOPES.ADMIN_REFRESH,
                expiresIn: REFRESH_TOKEN_EXPIRES_IN,
                tokenKey: 'refreshToken',
                expiresInKey: 'refreshTokenExpiresIn'
            }
        ];

        const tokens = await Promise.all(
            tokenConfigs.map(async (config) => {
                const token = await this.jwtService.sign(
                    { id: userId, scope: config.scope },
                    { expiresIn: config.expiresIn }
                );
                const expiresIn = Date.now() + config.expiresIn;
                
                return {
                    [config.tokenKey]: token,
                    [config.expiresInKey]: expiresIn
                };
            })
        );

        return tokens.reduce((acc, token) => ({ ...acc, ...token }), {} as TokensPair)
    }
}
