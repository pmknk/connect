import { FastifyReply, FastifyRequest } from 'fastify';
import { injectable } from 'inversify';
import {
    toCreateInviteDto,
    toCreateInviteResponse
} from '../dtos/create-invite.dto';
import { InviteService } from '../services/invite.service';
import { toDeleteInviteDto, toDeleteInviteResponseDto } from '../dtos/delete-invite.dto';
import { toGetInviteByCodeDto, toGetInviteByCodeResponseDto } from '../dtos/get-invite.dto';

/**
 * Controller class for handling invite-related HTTP requests.
 */
@injectable()
export class InviteController {
    /**
     * Creates an instance of InviteController.
     * @param inviteService - The service handling invite business logic.
     */
    constructor(private readonly inviteService: InviteService) {}

    /**
     * Handles the creation of a new invite.
     *
     * @param request - The Fastify request object containing invite data.
     * @param reply - The Fastify reply object used to send the response.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     */
    async createInvite(
        request: FastifyRequest,
        reply: FastifyReply
    ): Promise<void> {
        const inviteDto = toCreateInviteDto(request);
        return reply
            .status(201)
            .send(
                toCreateInviteResponse(
                    await this.inviteService.create(inviteDto)
                )
            );
    }

    /**
     * Handles the deletion of an invite.
     *
     * @param request - The Fastify request object containing invite data.
     * @param reply - The Fastify reply object used to send the response.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     */
    async deleteInvite(
        request: FastifyRequest,
        reply: FastifyReply
    ): Promise<void> {
        const inviteDto = toDeleteInviteDto(request);
        return reply
            .status(200)
            .send(
                toDeleteInviteResponseDto(await this.inviteService.deleteInvite(inviteDto))
            );
    }

    /**
     * Handles the request to get an invite by code.
     * @param request - The incoming request containing the code.
     * @param reply - The outgoing reply containing the invite.
     * @returns {Promise<void>} The response containing the invite.
     */
    async getInviteByCode(
        request: FastifyRequest,
        reply: FastifyReply
    ): Promise<void> {
        return reply.status(200).send(toGetInviteByCodeResponseDto(
            await this.inviteService.findByCode(toGetInviteByCodeDto(request).code)
        ));
    }
}
