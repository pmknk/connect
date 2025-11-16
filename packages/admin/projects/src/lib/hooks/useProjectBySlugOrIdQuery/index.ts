import { useHttpClient } from '@content/admin-utils';
import { useQuery } from '@tanstack/react-query';
import type { ProjectQueryResponse } from '../useProjectQuery';

const GET_PROJECT_BY_ID_ROUTE = (id: string) =>
    `/api/v1/identity/projects/${id}`;
const GET_PROJECT_BY_SLUG_ROUTE = (slug: string) =>
    `/api/v1/identity/projects/slug/${slug}`;

const UUID_REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const useProjectBySlugOrIdQuery = (slugOrId?: string) => {
    const httpClient = useHttpClient();
    const isUuid = !!slugOrId && UUID_REGEX.test(slugOrId);

    return useQuery({
        enabled: Boolean(slugOrId),
        queryKey: ['project', slugOrId],
        queryFn: ({ signal }) =>
            httpClient.get<ProjectQueryResponse>(
                isUuid
                    ? GET_PROJECT_BY_ID_ROUTE(slugOrId as string)
                    : GET_PROJECT_BY_SLUG_ROUTE(slugOrId as string),
                { signal }
            ),
        select: ({ data }) => data.data
    });
};


