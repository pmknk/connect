import { useHttpClient } from '@content/admin-utils';
import { useQuery } from '@tanstack/react-query';

export type SchemasQueryResponse = {
    data: {
        name: string;
        type: 'page' | 'collection' | 'internal';
        fields: Record<string, unknown>;
        options?: Record<string, unknown>;
    }[];
};

const GET_SCHEMAS_ROUTE = '/api/v1/content-library/schemas';

export const useSchemasQuery = () => {
    const httpClient = useHttpClient();

    return useQuery({
        queryKey: ['schemas'],
        queryFn: ({ signal }) =>
            httpClient.get<SchemasQueryResponse>(GET_SCHEMAS_ROUTE, {
                signal
            }),
        select: ({ data }) => data
    });
};


