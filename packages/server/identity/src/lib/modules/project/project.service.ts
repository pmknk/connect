import { injectable } from 'inversify';
import { ProjectRepository } from './project.repository';
import { Project } from './project.schema';

@injectable()
export class ProjectService {
    constructor(private readonly projectRepository: ProjectRepository) {}

    /**
     * Retrieves all projects associated with a specific user.
     * @param userId - The unique identifier of the user.
     * @returns A promise that resolves to an array of Project objects that belong to the specified user.
     */
    async findAllByUserId(userId: string): Promise<Project[]> {
        return await this.projectRepository.findAllByUserId(userId);
    }
}
