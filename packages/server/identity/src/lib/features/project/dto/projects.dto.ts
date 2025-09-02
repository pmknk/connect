import { Project } from '../project.schema';

export type ProjectsResponseDto = {
    data: {
        id: string;
        slug: string;
        name: string;
        description?: string;
    }[];
};

export const toProjectsResponseDto = (
    projects: Project[]
): ProjectsResponseDto => {
    return {
        data: projects.map((project) => ({
            id: project.id,
            slug: project.slug,
            name: project.name,
            description: project.description,
            createdAt: project.createdAt,
            updatedAt: project.updatedAt,
            deletedAt: project.deletedAt,
        }))
    };
};
