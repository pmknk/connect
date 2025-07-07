import { injectable } from 'inversify';
import { ProjectService } from './project.service';
import { ProjectsResponseDto, toProjectsResponseDto } from './dto/projects.dto';
import { FastifyRequest } from 'fastify';
import { User } from '../user/user.schema';
import {
    CreateProjectResponseDto,
    toCreateProjectRequestDto,
    toCreateProjectResponseDto
} from './dto/create-project.dto';

@injectable()
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    /**
     * Retrieves all projects associated with a specific user.
     * @param request - The Fastify request object containing the user.
     * @returns A promise that resolves to a ProjectsResponseDto object containing the projects.
     */
    async findAllByUserId(
        request: FastifyRequest
    ): Promise<ProjectsResponseDto> {
        const { user } = request as FastifyRequest & { user: User };
        return toProjectsResponseDto(
            await this.projectService.findAllByUserId(user.id)
        );
    }

    /**
     * Creates a new project
     * @param request - The Fastify request object containing the project details
     * @returns A promise that resolves to the created project
     */
    async create(request: FastifyRequest): Promise<CreateProjectResponseDto> {
        return toCreateProjectResponseDto(
            await this.projectService.createProject(
                toCreateProjectRequestDto(request)
            )
        );
    }
}
