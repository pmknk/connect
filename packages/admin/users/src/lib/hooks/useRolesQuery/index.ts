import { useQuery } from '@tanstack/react-query';
import { useHttpClient } from '@content/admin-utils';

/**
 * Response type for the roles query.
 */
export type RolesQueryResponse = {
    data: {
        id: string;
        name: string;
        slug: string;
        description: string;
    }[];
};

const GET_ALL_ROLES_ROUTE = '/api/v1/identity/roles';

/**
 * React hook to fetch all roles from the API.
 *
 * Uses React Query's `useQuery` to fetch and cache role data.
 *
 * @returns {import('@tanstack/react-query').UseQueryResult<RolesQueryResponse['data'], unknown>}
 * The query result object containing roles data and query state.
 *
 * @example
 * const { data, isLoading, error } = useRolesQuery();
 * // data contains the array of roles
 */
export const useRolesQuery = () => {
    const httpClient = useHttpClient();
    return useQuery({
        queryKey: ['roles'],
        queryFn: () => httpClient.get<RolesQueryResponse>(GET_ALL_ROLES_ROUTE),
        select: ({ data }) => data.data
    });
};
