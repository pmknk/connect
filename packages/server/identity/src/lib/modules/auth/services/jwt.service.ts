import { inject, injectable } from 'inversify';
import { sign, verify, type SignOptions } from 'jsonwebtoken';

import { IDENTITY_PLUGIN_OPTIONS_DI_PROVIDER } from '../../../constants';
import type { IdentityPluginOptions } from '../../../types';

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
export class JwtService {
    private readonly ACCESS_TOKEN_EXPIRES_IN = 3600 * 1000;
    private readonly REFRESH_TOKEN_EXPIRES_IN = 604800 * 1000;

    /**
     * Creates an instance of TokenService.
     *
     * @param {IdentityPluginOptions} identityPluginOptions - Plugin options containing JWT secret.
     */
    constructor(
        @inject(IDENTITY_PLUGIN_OPTIONS_DI_PROVIDER)
        private readonly identityPluginOptions: IdentityPluginOptions
    ) {}

    /**
     * Signs a payload and generates a JWT token.
     *
     * @param {Parameters<typeof sign>[0]} payload - The data to be encoded in the JWT.
     * @param {SignOptions} options - Options for signing the JWT.
     * @returns {Promise<string>} - A promise that resolves to the generated JWT token.
     */
    async sign(
        payload: Parameters<typeof sign>[0],
        options: SignOptions
    ): Promise<string> {
        return await new Promise<string>((resolve, reject) => {
            sign(
                payload,
                this.identityPluginOptions.jwtSecret,
                options,
                (err, token) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(token as string);
                    }
                }
            );
        });
    }

    /**
     * Verifies a JWT token and returns the decoded payload.
     *
     * @param {string} token - The JWT token to verify.
     * @returns {Promise<T>} - A promise that resolves to the decoded payload.
     */
    async verify<T>(token: string): Promise<T> {
        return await new Promise<T>((resolve, reject) => {
            verify(
                token,
                this.identityPluginOptions.jwtSecret,
                (err, decoded) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(decoded as T);
                    }
                }
            );
        });
    }

    /**
     * Generates access and refresh tokens for a user.
     * @param {string} userId - The ID of the user.
     * @returns {Promise<TokensPair>} - Returns an object containing access and refresh tokens along with their expiration times.
     */
    async getTokensPair(userId: string): Promise<TokensPair> {
        return {
            accessToken: await this.sign(
                {
                    id: userId,
                    isAccess: true,
                    isRefresh: false
                },
                { expiresIn: '1h' }
            ),
            accessTokenExpiresIn: Date.now() + this.ACCESS_TOKEN_EXPIRES_IN,
            refreshToken: await this.sign(
                {
                    id: userId,
                    isAccess: false,
                    isRefresh: true
                },
                { expiresIn: '7d' }
            ),
            refreshTokenExpiresIn: Date.now() + this.REFRESH_TOKEN_EXPIRES_IN
        };
    }
}
