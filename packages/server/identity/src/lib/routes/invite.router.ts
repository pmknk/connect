import { injectable } from 'inversify';
import { InviteController } from '../controllers/invite.controller';
import { FastifyApplicationInstance } from '@connect/server-core';
import { createInviteRequestSchema } from '../dtos/create-invite.dto';
import { TOKEN_SCOPES } from '../constants';
import { deleteInviteRequestSchema } from '../dtos/delete-invite.dto';
import { getInviteByCodeRequestSchema } from '../dtos/get-invite.dto';

@injectable()
export class InviteRouter {
    constructor(private readonly inviteController: InviteController) {}

    async initialize(fastify: FastifyApplicationInstance) {
        const ROUTE_PATHS = {
            INVITES: '/api/v1/identity/invites'
        };

        fastify.get(
            `${ROUTE_PATHS.INVITES}/:code`,
            {
                schema: getInviteByCodeRequestSchema,
                config: {
                    auth: false,
                }
            },
            this.inviteController.getInviteByCode.bind(this.inviteController)
        );

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
            `${ROUTE_PATHS.INVITES}/:id`,
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
