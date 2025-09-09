import { FastifyRequest } from 'fastify';
import { injectable } from 'inversify';
import { TOKEN_SCOPE } from '../constants';
import { User } from '../schemas/user.schema';
import { AuthService } from '../services/auth.service';

/**
 * Configuration object for authentication settings
 */
type AuthConfig = {
    auth: boolean;
    scope?: TOKEN_SCOPE;
};

/**
 * Middleware responsible for handling authentication in Fastify requests
 *
 * This middleware authenticates users based on JWT tokens and attaches
 * the authenticated user to the request object. It can be configured
 * per route to require authentication and optionally verify specific token scopes.
 */
@injectable()
export class AuthMiddleware {
    /**
     * Creates an instance of AuthMiddleware
     *
     * @param authService - Service responsible for user authentication
     */
    constructor(private readonly authService: AuthService) {}

    /**
     * Authenticates a user from the request and attaches the user to the request object
     *
     * This method extracts authentication configuration from the route options,
     * performs user authentication if required, and handles authentication errors.
     * If authentication is not required (auth !== true), the method returns early.
     *
     * @param request - Fastify request object with user property for storing authenticated user
     * @throws {UnauthorizedError} When authentication fails or user is not found
     * @returns {Promise<void>} A promise that resolves when authentication is complete
     *
     * @example
     * ```typescript
     * // Route configuration requiring authentication
     * {
     *   config: {
     *     auth: true,
     *     scope: TOKEN_SCOPE.ACCESS
     *   }
     * }
     * ```
     */
    async authenticate(request: FastifyRequest & { user: User | null }) {
        const { auth, scope } = request.routeOptions
            .config as unknown as AuthConfig;

        if (auth !== true) return;

        try {
            request.user = await this.authService.authenticateUser(
                request,
                scope
            );
        } catch (error) {
            request.user = null;
            throw error;
        }
    }
}
