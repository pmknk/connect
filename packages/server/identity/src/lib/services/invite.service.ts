import { injectable } from 'inversify';

import { ConnectionService, ModelService } from '@avyyx/server-database';

import { type CreateInviteDto } from '../dtos/create-invite.dto';

import { type Invite } from '../schemas/invite.schema';
import { Op, type ModelStatic, type Transaction } from 'sequelize';
import { type Role } from '../schemas/role.schema';
import { type Project } from '../schemas/project.schema';
import { type User } from '../schemas/user.schema';
import { type UserRoles } from '../schemas/user-roles.schema';
import { type ProjectUsers } from '../schemas/project-users.schema';
import { type DeleteInviteDto } from '../dtos/delete-invite.dto';

/**
 * Service for creating user invites and wiring related associations.
 */
@injectable()
export class InviteService {
    private readonly inviteModel: ModelStatic<Invite>;
    private readonly roleModel: ModelStatic<Role>;
    private readonly projectModel: ModelStatic<Project>;
    private readonly userModel: ModelStatic<User>;
    private readonly userRolesModel: ModelStatic<UserRoles>;
    private readonly projectUsersModel: ModelStatic<ProjectUsers>;

    constructor(
        private readonly modelService: ModelService,
        private readonly connectionService: ConnectionService,
    ) {
        this.inviteModel = this.modelService.getModel<Invite>('Invites');
        this.roleModel = this.modelService.getModel<Role>('Roles');
        this.projectModel = this.modelService.getModel<Project>('Projects');
        this.userModel = this.modelService.getModel<User>('Users');
        this.userRolesModel = this.modelService.getModel<UserRoles>('UserRoles');
        this.projectUsersModel = this.modelService.getModel<ProjectUsers>('ProjectUsers');
    }

    /**
     * Creates an invite and associated user records in a single transaction.
     *
     * @param inviteDto - Payload with user, role, and projects information
     * @returns The created `Invite` model instance
     * @throws If the role does not exist or any DB operation fails
     */
    async create(inviteDto: CreateInviteDto): Promise<Invite> {
        const transaction = await this.connectionService.client.transaction();
        try {
            const role = await this.findRoleOrThrow(inviteDto.roleId);
            const projects = await this.findProjects(inviteDto.projectIds);
            const code = this.generateInviteCode();
            const user = await this.createUser(inviteDto.email, inviteDto.fullname, transaction);
            await this.attachUserRole(user.id, role.id, transaction);
            await this.attachUserProjects(user.id, projects.map(p => p.id), transaction);
            const invite = await this.createInvite(code, user.id, transaction);
            await transaction.commit();
            return invite;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    /**
     * Loads a role by id or throws if not found.
     */
    private async findRoleOrThrow(roleId: string): Promise<Role> {
        const role = await this.roleModel.findByPk(roleId);
        if (!role) {
            throw new Error('Role not found');
        }
        return role;
    }

    /**
     * Loads all projects by ids. Returns empty array if none found.
     */
    private async findProjects(projectIds: string[]): Promise<Project[]> {
        if (!projectIds || projectIds.length === 0) {
            return [];
        }
        return this.projectModel.findAll({
            where: {
                id: {
                    [Op.in]: projectIds
                }
            }
        });
    }

    /**
     * Generates a short invite code.
     */
    private generateInviteCode(): string {
        return Math.random().toString(36).slice(2, 14);
    }

    /**
     * Creates a user within a transaction.
     */
    private createUser(email: string, fullName: string, transaction: Transaction) {
        return this.userModel.create(
            { email, fullName },
            { transaction }
        );
    }

    /**
     * Attaches a role to a user within a transaction.
     */
    private attachUserRole(userId: string, roleId: string, transaction: Transaction) {
        return this.userRolesModel.create(
            { userId, roleId },
            { transaction }
        );
    }

    /**
     * Attaches projects to a user within a transaction.
     */
    private async attachUserProjects(userId: string, projectIds: string[], transaction: Transaction) {
        for (const projectId of projectIds) {
            await this.projectUsersModel.create(
                { userId, projectId },
                { transaction }
            );
        }
    }

    /**
     * Creates an invite within a transaction.
     */
    private createInvite(code: string, userId: string, transaction: Transaction) {
        return this.inviteModel.create(
            { code, userId },
            { transaction }
        );
    }

    /**
     * Deletes an invite within a transaction.
     */
    async deleteInvite({ id }: DeleteInviteDto) {
        const transaction = await this.connectionService.client.transaction();
        try {
            const invite = await this.findInviteOrThrow(id);
            const user = invite.user;
            if (user) {
                await this.userModel.destroy({ where: { id: user.id }, transaction });
            }
            await this.inviteModel.destroy({ where: { id }, transaction });
            await transaction.commit();
            return {
                id
            }
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    /**
     * Loads an invite by id or throws if not found.
     */
    private async findInviteOrThrow(id: string): Promise<Invite> {
        const invite = await this.inviteModel.findByPk(id, {
            include: [
                {
                    model: this.userModel,
                    as: 'user'
                }
            ]
        });
        if (!invite) {
            throw new Error('Invite not found');
        }
        return invite;
    }
}
