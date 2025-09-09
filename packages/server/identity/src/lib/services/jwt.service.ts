import { inject, injectable } from 'inversify';
import { sign, verify, type SignOptions } from 'jsonwebtoken';

import { IDENTITY_PLUGIN_OPTIONS_DI_PROVIDER } from '../constants';
import type { IdentityPluginOptions } from '../types';

@injectable()
export class JwtService {
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
}
