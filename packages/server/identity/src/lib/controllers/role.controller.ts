import { injectable } from 'inversify';
import type { FastifyReply, FastifyRequest } from 'fastify';

import { RoleService } from '../services/role.service';
import {
    GetRolesResponseDto,
    toGetRolesResponseDto
} from '../dtos/get-roles.dto';

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
     * @param reply - The Fastify reply object used to send the response
     * @returns A promise that resolves to a RolesResponseDto containing the list of roles.
     */
    async getRoles(
        _request: FastifyRequest,
        reply: FastifyReply
    ): Promise<GetRolesResponseDto> {
        return reply
            .status(200)
            .send(toGetRolesResponseDto(await this.roleService.findAll()));
    }
}
