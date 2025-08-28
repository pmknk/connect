import { FastifyReply, FastifyRequest } from "fastify";
import { injectable } from "inversify";
import { toCreateInviteDto } from "./dtos/create-invite.dto";
import { InviteService } from "./invite.service";

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
    async createInvite(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        const inviteDto = toCreateInviteDto(request);
        const invite = await this.inviteService.create(inviteDto);
        return reply.status(201).send(invite);
    }
}