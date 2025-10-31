import { useHttpClient } from "@content/admin-utils";
import { useMutation } from "@tanstack/react-query";
import { JoinFormData } from "../useJoinForm";

const JOIN_ROUTE = '/api/v1/identity/auth/signup';

export type JoinMutationResponse = {
    data: {
        success: boolean;
    };
};

/**
 * Custom hook for handling join mutation
 *
 * @returns A mutation object for join operations
 */
export const useJoinMutation = (onSuccess: (data: JoinMutationResponse) => void) => {
    const httpClient = useHttpClient();

    return useMutation({
        mutationKey: ['join'],
        mutationFn: (dto: JoinFormData) => {
            return httpClient.post(JOIN_ROUTE, {
                password: dto.password,
                inviteCode: dto.code
            });
        },
        onSuccess,
    })
};