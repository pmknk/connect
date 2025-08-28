import { useQuery } from '@tanstack/react-query';
import { useHttpClient, useUser } from '@avyyx/admin-utils';
import { useEffect } from 'react';

export type MeQueryResponse = {
    data: {
        id: string;
        email: string;
        fullName: string;
        createdAt: string;
        updatedAt: string;
    };
};

/**
 * Custom hook for fetching and managing current user data
 *
 * Fetches the current user's information from the API and automatically
 * updates the user context when data is received.
 *
 * @returns An object containing:
 *   - data: The current user data (id, email, fullName, createdAt, updatedAt)
 *   - isLoading: Boolean indicating if the query is in progress
 *   - error: Any error that occurred during the query
 *
 * @example
 * ```tsx
 * const { data: user, isLoading, error } = useMeQuery()
 *
 * if (isLoading) return <div>Loading...</div>
 * if (error) return <div>Error loading user data</div>
 *
 * return <div>Welcome, {user?.fullName}</div>
 * ```
 */
const ME_ROUTE = '/api/v1/identity/auth/me';

export const useMeQuery = () => {
    const httpClient = useHttpClient();
    const { setUser } = useUser();

    const query = useQuery({
        queryKey: ['me'],
        queryFn: ({ signal }) =>
            httpClient.get<MeQueryResponse>(ME_ROUTE, { signal }),
        select: ({ data }) => data.data
    });

    useEffect(() => {
        if (query.data) {
            setUser(query.data);
        }
    }, [query.data, setUser]);

    return query;
};
