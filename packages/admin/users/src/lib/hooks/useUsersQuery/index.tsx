import { useHttpClient } from '@avyyx/admin-utils';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

/**
 * Response type for the users query.
 */
export type UsersQueryResponse = {
    data: {
        id: string;
        fullName: string;
        email: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
        roles: {
            id: string;
            name: string;
            slug: string;
            description: string;
        }[];
        projects: {
            id: string;
            name: string;
            slug: string;
            description: string;
        }[];
    }[];
    meta: {
        total: number;
        offset: number;
        limit: number;
    };
};

const GET_ALL_USERS_ROUTE = '/api/v1/identity/users';
const DEFAULT_LIMIT = 10;

/**
 * React hook to fetch paginated users from the API.
 *
 * Uses React Query's `useQuery` to fetch and cache user data.
 *
 * @param {number} [page=1] - The current page number (1-based).
 * @param {number} [limit=DEFAULT_LIMIT] - Number of users to fetch per page.
 * @returns {import('@tanstack/react-query').UseQueryResult<UsersQueryResponse>} The query result object containing users data and query state.
 *
 * @example
 * const { data, isLoading, error } = useUsersQuery(2, 10);
 * // data.data contains the array of users for page 2, 10 per page
 */
export const useUsersQuery = (page: number = 1, limit: number = DEFAULT_LIMIT, search?: string) => {
    const httpClient = useHttpClient();

    return useQuery({
        queryKey: ['users', page, limit, search ?? ''],
        queryFn: ({ signal }) =>
            httpClient.get<UsersQueryResponse>(GET_ALL_USERS_ROUTE, {
                signal,
                params: {
                    offset: (page - 1) * limit,
                    limit,
                    search,
                    include: [{ association: 'roles' }, { association: 'projects' }],
                    paranoid: false
                }
            }),
        select: ({ data }) => data,
        placeholderData: keepPreviousData
    });
};
