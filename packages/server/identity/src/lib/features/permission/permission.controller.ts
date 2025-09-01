import { injectable } from "inversify";
import { PermissionService } from "./permission.service";
import { FastifyRequest } from "fastify";
import { User } from "../user/user.schema";
import { toPermissionResponseDto } from "./dtos/permission.dto";

@injectable()
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) {}

    /**
     * Handles the request to get permissions for a user
     * @param request - The incoming request containing the user
     * @returns {Promise<PermissionResponseDto>} The permission response containing the permissions
     */
    async getPermissions(request: FastifyRequest) {
        const { user } = request as FastifyRequest & { user: User };
        return toPermissionResponseDto(await this.permissionService.findByUserId(user.id));
    }
}