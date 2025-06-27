import { useHttpClient, usePermissions } from '@avyyx/admin-utils';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export type PermissionsQueryResponse = {
    data: {
        id: string;
        action: string;
        resource: string;
    }[];
};

/**
 * Custom hook for fetching and managing user permissions
 *
 * Fetches the current user's permissions from the API and automatically
 * updates the permissions context when data is received.
 *
 * @returns An object containing:
 *   - data: Array of permission objects (id, action, resource)
 *   - isLoading: Boolean indicating if the query is in progress
 *   - error: Any error that occurred during the query
 *
 * @example
 * ```tsx
 * const { data: permissions, isLoading, error } = usePermissionsQuery()
 *
 * if (isLoading) return <div>Loading permissions...</div>
 * if (error) return <div>Error loading permissions</div>
 *
 * return (
 *   <div>
 *     {permissions?.map(permission => (
 *       <div key={permission.id}>
 *         {permission.action} on {permission.resource}
 *       </div>
 *     ))}
 *   </div>
 * )
 * ```
 */
const PERMISSIONS_ROUTE = '/identity/permissions';

export const usePermissionsQuery = () => {
    const httpClient = useHttpClient();

    const { setPermissions } = usePermissions();
    const query = useQuery({
        queryKey: ['permissions'],
        queryFn: () =>
            httpClient.get<PermissionsQueryResponse>(PERMISSIONS_ROUTE),
        select: ({ data }) => data.data
    });

    useEffect(() => {
        if (query.data) {
            setPermissions(query.data);
        }
    }, [query.data, setPermissions]);

    return query;
};
