import { EntryService } from '@avyyx/server-database';
import { injectable } from 'inversify';
import { Project } from './project.schema';

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
                    required: true,
                    association: 'Users',
                    where: {
                        id: userId,
                        deletedAt: null
                    }
                }
            ]
        });
    }
}
