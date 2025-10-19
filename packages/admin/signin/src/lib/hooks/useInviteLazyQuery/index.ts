import { useHttpClient } from "@connect/admin-utils";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";

export type InviteQueryResponse = {
    data: {
        id: string;
        code: string;
        user: {
            id: string;
            email: string;
            fullName: string;
        };
        createdAt: string;
        updatedAt: string;
    };
};

const getInviteRoute = (code: string) => `/api/v1/identity/invites/${code}`;

export const useInviteLazyQuery = () => {
    const httpClient = useHttpClient();
    const queryClient = useQueryClient();
    
    const [data, setData] = useState<InviteQueryResponse | undefined>(undefined);
    const [error, setError] = useState<unknown>(undefined);
    const [isLoading, setIsLoading] = useState(false);

    const fetchInvite = async (code: string): Promise<InviteQueryResponse | undefined> => {
        setIsLoading(true);
        setError(undefined);
        try {
            const response = await queryClient.fetchQuery({
                queryKey: ['invite', code],
                queryFn: async ({ signal }) => {
                    const res = await httpClient.get<InviteQueryResponse>(getInviteRoute(code), { signal });
                    return res.data;
                },
            });
            setData(response);
            return response;
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
        return undefined;
    };

    return { 
        fetchInvite, 
        data,
        error,
        isLoading,
        isNotFoundError: error instanceof AxiosError && error.response?.status === 404
    };
};