import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useHttpClient } from "@content/admin-utils";
import { UserFormData } from "../useUserForm";

const UPDATE_USER_ROUTE = '/api/v1/identity/users';

type UpdateUserMutationResponse = {
    data: {
        id: string;
    };
};

export const useUpdateUserMutation = (onSuccess?: () => void) => {
    const httpClient = useHttpClient();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['update-user'],
        mutationFn: (data: UserFormData) =>
            httpClient.put<UpdateUserMutationResponse>(UPDATE_USER_ROUTE, data)
        ,
        onSuccess: ({ data }) => {
            queryClient.invalidateQueries({ queryKey: ['user', data.data.id] });
            onSuccess?.();
        }
    });
};