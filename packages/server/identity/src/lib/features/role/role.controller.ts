import { injectable } from "inversify";
import { FastifyRequest } from "fastify";

import { RoleService } from "./role.service";
import { RolesResponseDto, toRolesResponseDto } from "./dtos/roles.dto";

/**
 * Controller for handling role-related API endpoints.
 */
@injectable()
export class RoleController {
    /**
     * Creates an instance of RoleController.
     * @param roleService - The service used to interact with roles.
     */
    constructor(private readonly roleService: RoleService) {}

    /**
     * Handles the request to retrieve all roles.
     * @param request - The Fastify request object.
     * @returns A promise that resolves to a RolesResponseDto containing the list of roles.
     */
    async getRoles(request: FastifyRequest): Promise<RolesResponseDto> {
        return toRolesResponseDto(await this.roleService.getRoles());
    }
}