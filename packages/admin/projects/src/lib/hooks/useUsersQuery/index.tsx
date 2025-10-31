import { useHttpClient } from '@content/admin-utils';
import { useInfiniteQuery } from '@tanstack/react-query';

export type UsersQueryResponse = {
    data: {
        id: string;
        fullName: string;
        email: string;
    }[];
    meta: {
        total: number;
        offset: number;
        limit: number;
    };
};

const GET_ALL_USERS_ROUTE = '/api/v1/identity/users';
const DEFAULT_LIMIT = 20;

/**
 * Hook for fetching users with infinite loading support
 *
 * This hook provides paginated user data with automatic infinite scrolling.
 * It uses React Query's useInfiniteQuery for efficient caching and background updates.
 *
 * @param limit - Number of users to fetch per page (default: 20)
 * @returns Object containing users data and infinite query methods
 *
 * @example
 * ```tsx
 * const { users, fetchNextPage, hasNextPage, isFetchingNextPage } = useUsersQuery(10);
 *
 * // Load more users when user scrolls to bottom
 * const handleScrollEnd = () => {
 *   if (hasNextPage && !isFetchingNextPage) {
 *     fetchNextPage();
 *   }
 * };
 * ```
 */
export const useUsersQuery = (limit: number = DEFAULT_LIMIT, search?: string) => {
    const httpClient = useHttpClient();

    const query = useInfiniteQuery({
        queryKey: ['users', 'infinite', { limit, search: search ?? '' }],
        queryFn: ({ pageParam = 0, signal }) =>
            httpClient.get<UsersQueryResponse>(GET_ALL_USERS_ROUTE, {
                signal,
                params: {
                    offset: pageParam * limit,
                    limit,
                    search
                }
            }),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const { meta } = lastPage.data;
            const hasMore = meta.offset + meta.limit < meta.total;
            return hasMore ? allPages.length : undefined;
        }
    });

    return {
        ...query,
        users: query.data?.pages.flatMap((page) => page.data.data) || [],
        total: query.data?.pages[0]?.data.meta.total || 0
    };
};
