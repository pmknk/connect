import { useHttpClient } from "@avyyx/admin-utils"
import { useQuery } from "@tanstack/react-query";

export const useMeQuery = () => {
    const httpClient = useHttpClient();

    return useQuery({
        queryKey: ['me'],
        queryFn: () => httpClient.get('/identity/auth/me')
    })
}