import { ConnectionService, ModelService } from '@content/server-database';
import { injectable } from 'inversify';

import { type ModelStatic } from 'sequelize';
import { type Project } from '../schemas/project.schema';
import { type CreateProjectRequestDto } from '../dtos/create-project.dto';
import { type ProjectUsers } from '../schemas/project-users.schema';
import { type User } from '../schemas/user.schema';

@injectable()
export class ProjectService {
    private readonly userModel: ModelStatic<User>;
    private readonly projectModel: ModelStatic<Project>;
    private readonly projectUsersModel: ModelStatic<ProjectUsers>;
    
    constructor(
        private readonly modelService: ModelService,
        private readonly connectionService: ConnectionService
    ) {
        this.projectModel = this.modelService.getModel<Project>('Projects');
        this.projectUsersModel = this.modelService.getModel<ProjectUsers>('ProjectUsers');
        this.userModel = this.modelService.getModel<User>('Users');
    }

    /**
     * Retrieves all projects associated with a specific user.
     * @param userId - The unique identifier of the user.
     * @returns A promise that resolves to an array of Project objects that belong to the specified user.
     */
    async findAllByUserId(userId: string): Promise<Project[]> {
        return await this.projectModel.findAll({
            include: [
                {
                    model: this.userModel,
                    as: 'users',
                    where: {
                        id: userId
                    }
                }
            ]
        });
    }

    /**
     * Creates a new project
     * @param dto - The data transfer object containing the project details
     * @returns A promise that resolves to the created project
     */
    async createProject({
        userIds,
        ...dto
    }: CreateProjectRequestDto): Promise<Project> {
        const transaction = await this.connectionService.client.transaction();
        try {
            const project = await this.projectModel.create(
                {
                    ...dto
                },
                { transaction }
            );
            for (const userId of userIds) {
                await this.projectUsersModel.create(
                    {
                        projectId: project.id,
                        userId: userId
                    },
                    { transaction }
                );
            }
            await transaction.commit();
            return project;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}
