import { UnauthorizedError } from '@connect/server-utils';
import { FastifyRequest } from 'fastify';
import { injectable } from 'inversify';
import { TokenExpiredError } from 'jsonwebtoken';

import { TOKEN_SCOPE } from '../constants';
import { JwtService } from './jwt.service';

import { ModelService } from '@connect/server-database';
import { ModelStatic } from 'sequelize';

import type { User } from '../schemas/user.schema';

@injectable()
export class AuthService {
    private readonly userModel: ModelStatic<User>;
    constructor(
        private readonly jwtService: JwtService,
        private readonly modelService: ModelService
    ) {
        this.userModel = this.modelService.getModel<User>('Users');
    }

    /**
     * Authenticates a user from the request and returns the user object.
     *
     * @param request - Fastify request object
     * @param scope - Optional token scope to verify
     * @throws {UnauthorizedError} If authentication fails
     * @returns Authenticated user object
     */
    async authenticateUser(
        request: FastifyRequest,
        scope?: TOKEN_SCOPE
    ): Promise<User> {
        const token = this.extractToken(request);
        const userId = await this.verifyToken(token, scope);
        const user = await this.userModel.findByPk(userId);

        if (!user) {
            throw new UnauthorizedError('User not found');
        }

        return user;
    }

    /**
     * Extracts JWT token from request headers.
     *
     * @param req - Fastify request object
     * @throws {UnauthorizedError} If token is missing or malformed
     * @returns Extracted JWT token
     */
    private extractToken(req: FastifyRequest): string {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new UnauthorizedError('No authorization header provided');
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new UnauthorizedError(
                'Token not provided in the authorization header'
            );
        }

        return token;
    }

    /**
     * Verifies JWT token validity and extracts user ID.
     *
     * @param token - JWT token to verify
     * @param scope - Optional token scope
     * @throws {UnauthorizedError} If token is invalid or expired
     * @returns Verified user ID from token
     */
    private async verifyToken(
        token: string,
        scope?: TOKEN_SCOPE
    ): Promise<string> {
        try {
            const decoded = await this.jwtService.verify<{
                id: string;
                scope: TOKEN_SCOPE;
            }>(token);

            if (scope && decoded.scope !== scope) {
                throw new UnauthorizedError('Invalid token scope');
            }

            return decoded.id;
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                throw new UnauthorizedError('Token expired');
            }
            throw new UnauthorizedError('Invalid token');
        }
    }
}
