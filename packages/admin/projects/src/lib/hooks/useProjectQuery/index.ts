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

const GET_PROJECT_BY_SLUG_ROUTE = (slug: string) =>
    `/api/v1/identity/projects/slug/${slug}`;

export const useProjectQuery = (projectSlug?: string) => {
    const httpClient = useHttpClient();

    return useQuery({
        enabled: Boolean(projectSlug),
        queryKey: ['project', projectSlug],
        queryFn: ({ signal }) =>
            httpClient.get<ProjectQueryResponse>(
                GET_PROJECT_BY_SLUG_ROUTE(projectSlug as string),
                {
                    signal
                }
            ),
        select: ({ data }) => data.data
    });
};
