import { injectable } from 'inversify';
import { InviteController } from '../controllers/invite.controller';
import { FastifyApplicationInstance } from '@avyyx/server-core';
import { createInviteRequestSchema } from '../dtos/create-invite.dto';
import { TOKEN_SCOPES } from '../constants';
import { deleteInviteRequestSchema } from '../dtos/delete-invite.dto';

@injectable()
export class InviteRouter {
    constructor(private readonly inviteController: InviteController) {}

    async initialize(fastify: FastifyApplicationInstance) {
        const ROUTE_PATHS = {
            INVITES: '/api/v1/identity/invites'
        };

        fastify.post(
            ROUTE_PATHS.INVITES,
            {
                schema: createInviteRequestSchema,
                config: {
                    auth: true,
                    scope: TOKEN_SCOPES.ADMIN_ACCESS
                }
            },
            this.inviteController.createInvite.bind(this.inviteController)
        );

        fastify.delete(
            ROUTE_PATHS.INVITES,
            {
                schema: deleteInviteRequestSchema,
                config: {
                    auth: true,
                    scope: TOKEN_SCOPES.ADMIN_ACCESS
                }
            },
            this.inviteController.deleteInvite.bind(this.inviteController)
        );
    }
}
