import { Project } from '../project.schema';

export type ProjectsResponseDto = {
    data: {
        id: string;
        slug: string;
        name: string;
        description?: string;
        users: {
            id: string;
            fullName: string;
            email: string;
        }[];
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
            users: project.users?.map((user) => ({
                id: user.id,
                fullName: user.fullName,
                email: user.email
            })) || []
        }))
    };
};
