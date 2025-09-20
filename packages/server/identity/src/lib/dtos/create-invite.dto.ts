import { FastifyRequest } from 'fastify';
import { type Invite } from '../schemas/invite.schema';

/**
 * DTO for creating an invite.
 */
export type CreateInviteDto = {
    /** Email address of the invitee */
    email: string;
    /** Full name of the invitee */
    fullname: string;
    /** Role ID to assign to the invitee */
    roleId: string;
    /** List of project IDs to associate with the invite */
    projectIds: string[];
};

/**
 * DTO for the response after creating an invite.
 */
export type CreateInviteResponse = {
    data: {
        /** The unique ID of the created invite */
        id: string;
        /** The invite code generated for the invitee */
        code: string;
    };
};

/**
 * Converts a FastifyRequest to a CreateInviteDto.
 * @param request - Fastify request containing the invite data in the body.
 * @returns The CreateInviteDto object.
 */
export const toCreateInviteDto = (request: FastifyRequest): CreateInviteDto => {
    const { email, fullname, roleId, projectIds } =
        request.body as CreateInviteDto;
    return { email, fullname, roleId, projectIds };
};

/**
 * Converts an Invite entity to a CreateInviteResponse.
 * @param invite - The Invite entity.
 * @returns The CreateInviteResponse object.
 */
export const toCreateInviteResponse = (
    invite: Invite
): CreateInviteResponse => {
    const { id, code } = invite;
    return { data: { id, code } };
};

/**
 * JSON schema for validating the create invite request body.
 */
export const createInviteRequestSchema = {
    body: {
        type: 'object',
        properties: {
            email: { type: 'string', format: 'email' },
            fullName: { type: 'string' },
            roleId: { type: 'string' },
            projectIds: { type: 'array', items: { type: 'string' } }
        }
    },
    required: ['email', 'fullName', 'roleId']
};
