import { useHttpClient } from '@connect/admin-utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const DELETE_USER_ROUTE = '/api/v1/identity/users/:id';

type DeleteUserMutationResponse = void;

/**
 * React Query mutation hook to delete a user by id.
 *
 * @param onSuccess Optional callback invoked after successful deletion
 */
export const useDeleteUserMutation = (onSuccess?: (id: string) => void, onError?: (error: Error) => void) => {
    const httpClient = useHttpClient();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['delete-user'],
        mutationFn: async (id: string) => {
            await httpClient.delete<DeleteUserMutationResponse>(
                DELETE_USER_ROUTE.replace(':id', id)
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


