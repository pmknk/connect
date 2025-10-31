import { UnauthorizedError } from '@content/server-utils';
import { ModelService } from '@content/server-database';

import { ModelStatic } from 'sequelize';
import { injectable } from 'inversify';

import { JwtService } from './jwt.service';
import { SigninRequestDto } from '../dtos/signin.dto';
import { generateHash } from '../utils';
import {
    ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_EXPIRES_IN,
    TOKEN_SCOPES
} from '../constants';
import type { User } from '../schemas/user.schema';
import { SignupRequestDto } from '../dtos/signup.dto';
import { Invite } from '../schemas/invite.schema';
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
    private readonly userModel: ModelStatic<User>;
    private readonly inviteModel: ModelStatic<Invite>;
    constructor(
        private readonly jwtService: JwtService,
        private readonly modelService: ModelService
    ) {
        this.userModel = this.modelService.getModel<User>('Users');
        this.inviteModel = this.modelService.getModel<Invite>('Invites');
    }

    /**
     * Signs in a user and returns a tokens pair.
     * @param dto - The signin DTO.
     * @returns The tokens pair.
     */
    async signin(dto: SigninRequestDto) {
        const user = await this.userModel.findOne({ where: { email: dto.email } });

        if (!user) throw new UnauthorizedError('Invalid email or password');

        const { hash } = generateHash(dto.password, user.salt);

        if (hash !== user.password)
            throw new UnauthorizedError('Invalid email or password');

        return await this.getTokensPair(user.id);
    }

    /**
     * Signs up a user and returns a tokens pair.
     * @param dto - The signup DTO.
     * @returns The tokens pair.
     */
    async signup(dto: SignupRequestDto): Promise<void> {
        const user = await this.userModel.findOne({
            include: [
                {
                    association: 'invite',
                    where: {
                        code: dto.inviteCode
                    }
                }
            ]
        })

        if (!user) throw new UnauthorizedError('Invalid invite code');

        const { hash, salt } = generateHash(dto.password);

        await user.update({
            password: hash,
            salt
        });

        await this.inviteModel.destroy({ where: { code: dto.inviteCode } });
    }

    /**
     * Generates access and refresh tokens for a user.
     * @param {string} userId - The ID of the user.
     * @returns {Promise<TokensPair>} - Returns an object containing access and refresh tokens along with their expiration times.
     */
    async getTokensPair(userId: string): Promise<TokensPair> {
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

        return tokens.reduce(
            (acc, token) => ({ ...acc, ...token }),
            {} as TokensPair
        );
    }
}
