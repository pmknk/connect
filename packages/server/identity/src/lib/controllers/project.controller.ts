import { injectable } from 'inversify';
import { ProjectService } from '../services/project.service';
import { FastifyRequest, FastifyReply } from 'fastify';
import { type User } from '../schemas/user.schema';
import {
    type CreateProjectResponseDto,
    toCreateProjectRequestDto,
    toCreateProjectResponseDto
} from '../dtos/create-project.dto';
import { type GetProjectsResponseDto, toGetProjectsResponseDto } from '../dtos/get-projects.dto';

@injectable()
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    /**
     * Retrieves all projects associated with a specific user.
     * @param request - The Fastify request object containing the user.
     * @param reply - The Fastify reply object used to send the response
     * @returns A promise that resolves to a ProjectsResponseDto object containing the projects.
     */
    async findAllByUserId(
        request: FastifyRequest,
        reply: FastifyReply
    ): Promise<GetProjectsResponseDto> {
        const { user } = request as FastifyRequest & { user: User };
        return reply
            .status(200)
            .send(toGetProjectsResponseDto(
                await this.projectService.findAllByUserId(user.id)
            )
        );
    }

    /**
     * Creates a new project
     * @param request - The Fastify request object containing the project details
     * @param reply - The Fastify reply object used to send the response
     * @returns A promise that resolves to the created project
     */
    async create(request: FastifyRequest, reply: FastifyReply): Promise<CreateProjectResponseDto> {
        return reply
            .status(201)
            .send(toCreateProjectResponseDto(
                await this.projectService.createProject(
                    toCreateProjectRequestDto(request)
                )
            )
        );
    }
}
