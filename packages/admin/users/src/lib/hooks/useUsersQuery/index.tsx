import { useHttpClient } from '@avyyx/admin-utils';
import { useQuery } from '@tanstack/react-query';

export const useUsersQuery = () => {
    const httpClient = useHttpClient();

    return useQuery({
        queryKey: ['users'],
        queryFn: () => httpClient.get('/identity/users')
    });
};
