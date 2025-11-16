import { ConnectionService, ModelService } from '@content/server-database';
import { injectable } from 'inversify';

import { type ModelStatic } from 'sequelize';
import { ConflictError, NotFoundError } from '@content/server-utils';
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
        this.projectUsersModel =
            this.modelService.getModel<ProjectUsers>('ProjectUsers');
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
        await this.validateProjectSlugCreation(dto.slug);
        await this.validateProjectNameCreation(dto.name);

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

    private async validateProjectSlugCreation(slug: string) {
        const existingWithSlug = await this.projectModel.findOne({
            where: { slug },
            paranoid: false
        });
        if (existingWithSlug) {
            throw new ConflictError('field:slug');
        }
    }

    private async validateProjectNameCreation(name: string) {
        const existingWithName = await this.projectModel.findOne({
            where: { name },
            paranoid: false
        });
        if (existingWithName) {
            throw new ConflictError('field:name');
        }
    }

    /**
     * Finds a project by its ID
     * @param id - The unique identifier of the project.
     * @param include - The associations to include.
     * @returns A promise that resolves to the Project object.
     */
    async findById(
        id: string,
        include?: { association: string }[]
    ): Promise<Project> {
        const project = await this.projectModel.findOne({
            where: { id },
            include,
            paranoid: false
        });

        if (!project) {
            throw new NotFoundError('Project not found');
        }

        return project;
    }

    /**
     * Finds a project by its slug
     * @param slug - The URL-friendly identifier of the project.
     * @param include - The associations to include.
     * @returns A promise that resolves to the Project object.
     */
    async findBySlug(
        slug: string,
        include?: { association: string }[]
    ): Promise<Project> {
        const project = await this.projectModel.findOne({
            where: { slug },
            include,
            paranoid: false
        });

        if (!project) {
            throw new NotFoundError('Project not found');
        }

        return project;
    }
}
