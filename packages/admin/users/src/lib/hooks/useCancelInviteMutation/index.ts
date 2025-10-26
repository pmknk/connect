import { useHttpClient } from "@connect/admin-utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CANCEL_INVITE_ROUTE = '/api/v1/identity/invites/:id';

type CancelInviteMutationResponse = {
    data: {
        id: string;
    };
};

/**
 * Custom React hook to cancel an invite by sending a DELETE request to the invite endpoint.
 *
 * This hook uses React Query's `useMutation` to handle the mutation state and logic.
 *
 * @returns {UseMutationResult<CancelInviteMutationResponse, unknown, string>}
 *   The mutation object returned by `useMutation`, which includes methods and state for the mutation.
 */
export const useCancelInviteMutation = (onSuccess?: () => void, onError?: (error: Error) => void) => {
    const queryClient = useQueryClient();
    const httpClient = useHttpClient();
    return useMutation({
        mutationKey: ['cancel-invite'],
        mutationFn: (id: string) =>
            httpClient.delete<CancelInviteMutationResponse>(CANCEL_INVITE_ROUTE.replace(':id', id))
        ,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            onSuccess?.();
        },
        onError
    });
}