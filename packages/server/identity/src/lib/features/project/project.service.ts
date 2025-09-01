import { ConnectionService } from '@avyyx/server-database';
import { injectable } from 'inversify';
import { ProjectRepository } from './project.repository';
import type { Project } from './project.schema';
import type { CreateProjectRequestDto } from './dto/create-project.dto';
import { UserRepository } from '../user/user.repository';

@injectable()
export class ProjectService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly projectRepository: ProjectRepository,
        private readonly connectionService: ConnectionService
    ) {}

    /**
     * Retrieves all projects associated with a specific user.
     * @param userId - The unique identifier of the user.
     * @returns A promise that resolves to an array of Project objects that belong to the specified user.
     */
    async findAllByUserId(userId: string): Promise<Project[]> {
        return await this.projectRepository.findAllByUserId(userId);
    }

    /**
     * Creates a new project
     * @param dto - The data transfer object containing the project details
     * @returns A promise that resolves to the created project
     */
    async createProject({
        userIds,
        assignAvailableUsers,
        ...dto
    }: CreateProjectRequestDto): Promise<Project> {
        const transaction = await this.connectionService.client.transaction();
        try {
            const project = await this.projectRepository.create(
                {
                    ...dto
                },
                transaction
            );

            await this.projectRepository.addUsers(
                project.id,
                assignAvailableUsers
                    ? (
                          await this.userRepository.findAll()
                      ).map((user) => user.id)
                    : userIds,
                transaction
            );

            await transaction.commit();
            return project;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}
