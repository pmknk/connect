import { useQuery } from '@tanstack/react-query';
import { useHttpClient } from '@avyyx/admin-utils';

/**
 * Response type for the user query.
 */
export type UserQueryResponse = {
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
        invite?: {
            id: string;
            code: string;
        };
    };
};

const GET_USER_ROUTE = '/api/v1/identity/users/:id';

/**
 * React hook to fetch a single user by ID from the API.
 *
 * Uses React Query's `useQuery` to fetch and cache user data.
 *
 * @param {string} id - The ID of the user to fetch.
 * @returns {import('@tanstack/react-query').UseQueryResult<UserQueryResponse['data'], unknown>}
 * The query result object containing user data and query state.
 *
 * @example
 * const { data, isLoading, error } = useUserQuery('user-id');
 * // data contains the user object
 */
export const useUserQuery = (id?: string) => {
    const httpClient = useHttpClient();
    return useQuery({
        queryKey: ['user', id],
        queryFn: ({ signal }) =>
            httpClient.get<UserQueryResponse>(
                GET_USER_ROUTE.replace(':id', id ?? ''),
                {
                    signal,
                    params: {
                        include: [
                            { association: 'roles' },
                            { association: 'projects' },
                            { association: 'invite' }
                        ]
                    }
                }
            ),
        select: ({ data }) => data.data,
        enabled: !!id,
    });
};
