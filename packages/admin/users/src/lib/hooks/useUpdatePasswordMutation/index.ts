import { useMutation } from '@tanstack/react-query';
import { useHttpClient } from '@content/admin-utils';

const UPDATE_PASSWORD_ROUTE = '/api/v1/identity/auth/password';

type UpdatePasswordMutationRequest = {
    password: string;
};

type UpdatePasswordMutationResponse = {
    data: {
        success: boolean;
    };
};

export const useUpdatePasswordMutation = (
    onSuccess?: () => void,
    onError?: (error: Error) => void
) => {
    const httpClient = useHttpClient();

    return useMutation({
        mutationKey: ['update-password'],
        mutationFn: (data: UpdatePasswordMutationRequest) =>
            httpClient.put<UpdatePasswordMutationResponse>(
                UPDATE_PASSWORD_ROUTE,
                data
            ),
        onSuccess: () => {
            onSuccess?.();
        },
        onError
    });
};
