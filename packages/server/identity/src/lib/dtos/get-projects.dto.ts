import { type Project } from '../schemas/project.schema';

export type GetProjectsResponseDto = {
    data: {
        id: string;
        slug: string;
        name: string;
        description?: string;
    }[];
};

export const toGetProjectsResponseDto = (
    projects: Project[]
): GetProjectsResponseDto => {
    return {
        data: projects.map((project) => ({
            id: project.id,
            slug: project.slug,
            name: project.name,
            description: project.description,
            createdAt: project.createdAt,
            updatedAt: project.updatedAt,
            deletedAt: project.deletedAt
        }))
    };
};
