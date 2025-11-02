import { useHttpClient } from '@content/admin-utils';
import { useQuery } from '@tanstack/react-query';

export type ProjectQueryResponse = {
    data: {
        id: string;
        slug: string;
        name: string;
        description?: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    };
};

const GET_PROJECT_ROUTE = (id: string) => `/api/v1/identity/projects/${id}`;

export const useProjectQuery = (projectId?: string) => {
    const httpClient = useHttpClient();

    return useQuery({
        enabled: Boolean(projectId),
        queryKey: ['project', projectId],
        queryFn: ({ signal }) =>
            httpClient.get<ProjectQueryResponse>(GET_PROJECT_ROUTE(projectId as string), {
                signal
            }),
        select: ({ data }) => data.data
    });
};


