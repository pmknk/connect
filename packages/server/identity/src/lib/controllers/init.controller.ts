import { injectable } from 'inversify';
import { InitService } from '../services/init.service';

import type { FastifyReply, FastifyRequest } from 'fastify';
import {
    type InitAdminResponseDto,
    toInitAdminResponseDto,
    toInitAdminUserDto
} from '../dtos/init.dto';

/**
 * Controller responsible for handling system initialization requests.
 */
@injectable()
export class InitController {
    /**
     * Creates an instance of InitController.
     * @param initService - Service for handling initialization logic.
     */
    constructor(private readonly initService: InitService) {}

    /**
     * Handles the initialization request to create an admin user.
     *
     * @param request - Fastify request object containing the admin user data.
     * @returns {Promise<void>} The result of the admin user creation.
     */
    async init(
        request: FastifyRequest,
        reply: FastifyReply
    ): Promise<InitAdminResponseDto> {
        await this.initService.createAdminUser(toInitAdminUserDto(request));
        return reply
            .status(201)
            .send(toInitAdminResponseDto('Root user created successfully'));
    }
}
