import { injectable } from "inversify";

import { ConnectionService } from "@avyyx/server-database";


import { InviteRepository } from "./invite.repository";
import { UserRepository } from "../user/user.repository";

// import type { Invite } from "./invite.schema";
import { CreateInviteDto } from "./dtos/create-invite.dto";
import { RoleRepository } from "../role/role.repository";
import { ProjectRepository } from "../project/project.repository";
@injectable()
export class InviteService {
    constructor(
        private readonly connectionService: ConnectionService,
        private readonly userRepository: UserRepository,
        private readonly inviteRepository: InviteRepository,
        private readonly roleRepository: RoleRepository,
        private readonly projectRepository: ProjectRepository
    ) {}

    async create(
        inviteDto: CreateInviteDto,
    ): Promise<void> {
        const transaction = await this.connectionService.client.transaction();
        const role = await this.roleRepository.findById(inviteDto.roleId);
        const projects = await this.projectRepository.findByIds(inviteDto.projectIds);
        
        if (!role) {
            throw new Error('Role not found');
        }

        try {
            const code = Math.random().toString(36).slice(2, 14);
            const user = await this.userRepository.create({
                email: inviteDto.email,
                fullName: inviteDto.fullName,
            }, transaction);

            await this.userRepository.addRole(user.id, role.id, transaction);
            await this.userRepository.addProjects(user.id, projects.map((project) => project.id), transaction);

            await this.inviteRepository.create({
                code,
                userId: user.id,
            }, transaction);
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}