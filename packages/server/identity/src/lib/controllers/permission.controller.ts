import { injectable } from 'inversify';
import { PermissionService } from '../services/permission.service';

import type { FastifyReply, FastifyRequest } from 'fastify';
import type { User } from '../schemas/user.schema';
import { type GetPermissionsResponseDto, toGetPermissionsResponseDto } from '../dtos/get-permissions.dto';

@injectable()
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) {}

    /**
     * Handles the request to get permissions for a user
     * @param request - The incoming request containing the user
     * @returns {Promise<GetPermissionsResponseDto>} The permission response containing the permissions
     */
    async getPermissions(request: FastifyRequest, reply: FastifyReply): Promise<GetPermissionsResponseDto> {
        const { user } = request as FastifyRequest & { user: User };
        return reply
            .status(200)
            .send(toGetPermissionsResponseDto(
                await this.permissionService.findByUserId(user.id)
            )
        );
    }
}
