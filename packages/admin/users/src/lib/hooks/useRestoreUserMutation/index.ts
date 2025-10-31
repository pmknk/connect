import { useHttpClient } from '@content/admin-utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const RESTORE_USER_ROUTE = '/api/v1/identity/users/:id/restore';

type RestoreUserMutationResponse = void;

/**
 * React Query mutation hook to restore a previously deleted user by id.
 *
 * @param onSuccess Optional callback invoked after successful restore
 */
export const useRestoreUserMutation = (onSuccess?: (id: string) => void, onError?: (error: Error) => void) => {
    const httpClient = useHttpClient();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['restore-user'],
        mutationFn: async (id: string) => {
            await httpClient.post<RestoreUserMutationResponse>(
                RESTORE_USER_ROUTE.replace(':id', id),
                {}
            );
            return id;
        },
        onSuccess: (id) => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['user', id] });
            onSuccess?.(id);
        },
        onError
    });
};


