import { EntryService, Transaction } from '@avyyx/server-database';
import { injectable } from 'inversify';
import type { Project, ProjectUser } from './project.schema';

/**
 * Repository class for managing Project entities in the database.
 * Provides methods to interact with the Projects schema and related data.
 */
@injectable()
export class ProjectRepository {
    /**
     * Creates a new instance of ProjectRepository.
     * @param entryService - The database entry service for performing database operations.
     */
    constructor(private readonly entryService: EntryService) {}

    /**
     * Retrieves all projects associated with a specific user.
     * @param userId - The unique identifier of the user.
     * @returns A promise that resolves to an array of Project objects that belong to the specified user.
     */
    async findAllByUserId(userId: string): Promise<Project[]> {
        return await this.entryService.find<Project>({
            schema: 'Projects',
            include: [
                {
                    association: 'users',
                    required: true,
                    where: { id: userId },
                    attributes: []
                }
            ],
            paranoid: false
        });
    }

    /**
     * Creates a new project in the database.
     * @param project - The project to create.
     * @param transaction - An optional transaction object to use for the operation.
     * @returns A promise that resolves to the created project.
     */
    async create(
        project: Partial<Project>,
        transaction?: Transaction
    ): Promise<Project> {
        return await this.entryService.create<Project>({
            schema: 'Projects',
            values: project,
            transaction
        });
    }

    /**
     * Adds users to a project
     * @param projectId - The unique identifier of the project.
     * @param userIds - An array of unique identifiers of the users to add to the project.
     * @param transaction - An optional transaction object to use for the operation.
     * @returns A promise that resolves to an array of ProjectUser objects that were added to the project.
     */
    async addUsers(
        projectId: string,
        userIds: string[],
        transaction?: Transaction
    ): Promise<ProjectUser[]> {
        return await this.entryService.bulkCreate<ProjectUser>({
            schema: 'ProjectUsers',
            values: userIds.map((userId) => ({
                projectId,
                userId
            })),
            transaction
        });
    }

    /**
     * Finds projects by their IDs.
     * @param ids - An array of project IDs.
     * @returns A promise that resolves to an array of Project objects that match the provided IDs.
     */
    async findByIds(ids: string[]): Promise<Project[]> {
        return await this.entryService.find<Project>({
            schema: 'Projects',
            where: { id: { $in: ids } },
            paranoid: false
        });
    }
}
