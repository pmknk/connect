import { useHttpClient, usePermissions } from "@avyyx/admin-utils";
import { useQuery } from "@tanstack/react-query";
import { API_URLS } from "../../constants";
import { useEffect } from "react";

export type PermissionsQueryResponse = {
    data: {
        id: string;
        action: string;
        resource: string;
    }[];
}

export const usePermissionsQuery = () => {
    const httpClient = useHttpClient();

    const { setPermissions } = usePermissions();
    const query = useQuery({
        queryKey: ['permissions'],
        queryFn: () => httpClient.get<PermissionsQueryResponse>(API_URLS.PERMISSIONS),
        select: ({ data }) => data.data
    });

    useEffect(() => {
        if (query.data) {
            setPermissions(query.data);
        }
    }, [query.data, setPermissions]);


    return query
}