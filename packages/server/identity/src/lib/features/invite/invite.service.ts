import { injectable } from 'inversify';

import { ConnectionService } from '@avyyx/server-database';

import { InviteRepository } from './invite.repository';
import { UserRepository } from '../user/user.repository';

import { CreateInviteDto } from './dtos/create-invite.dto';
import { RoleRepository } from '../role/role.repository';
import { ProjectRepository } from '../project/project.repository';
import { type Invite } from './invite.schema';

@injectable()
export class InviteService {
    constructor(
        private readonly connectionService: ConnectionService,
        private readonly userRepository: UserRepository,
        private readonly inviteRepository: InviteRepository,
        private readonly roleRepository: RoleRepository,
        private readonly projectRepository: ProjectRepository
    ) {}

    async create(inviteDto: CreateInviteDto): Promise<Invite> {
        const transaction = await this.connectionService.client.transaction();
        const role = await this.roleRepository.findById(inviteDto.roleId);
        const projects = await this.projectRepository.findByIds(
            inviteDto.projectIds
        );

        console.log('STARTING CREATE INVITE');

        if (!role) {
            throw new Error('Role not found');
        }

        console.log('ROLE FOUND');

        try {
            const code = Math.random().toString(36).slice(2, 14);
            console.log('CODE GENERATED', code);

            const user = await this.userRepository.create(
                {
                    email: inviteDto.email,
                    fullName: inviteDto.fullname
                },
                transaction
            );
            console.log('USER CREATED', user);

            await this.userRepository.addRole(user.id, role.id, transaction);
            console.log('ROLE ADDED');
            await this.userRepository.addProjects(
                user.id,
                projects.map((project) => project.id),
                transaction
            );
            console.log('PROJECTS ADDED');

            const invite = await this.inviteRepository.create(
                {
                    code,
                    userId: user.id
                },
                transaction
            );
            console.log('INVITE CREATED', invite);

            await transaction.commit();
            return invite;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}
