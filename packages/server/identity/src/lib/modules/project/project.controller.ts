import { injectable } from 'inversify';
import { ProjectService } from './project.service';
import { ProjectsResponseDto, toProjectsResponseDto } from './dto/projects.dto';
import { FastifyRequest } from 'fastify';
import { User } from '../user/user.schema';

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
}
