import { useHttpClient } from "@avyyx/admin-utils";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { CreateUserFormData } from "../useCreateUserForm";

const CREATE_USER_ROUTE = '/api/v1/identity/invite';

/**
 * The response type returned from the create user mutation.
 */
type CreateUserMutationResponse = {
    data: {
        id: string;
    };
};

/**
 * Custom React hook to create a new user by sending a POST request to the invite endpoint.
 *
 * This hook uses React Query's `useMutation` to handle the mutation state and logic.
 *
 * @returns {UseMutationResult<CreateUserMutationResponse, unknown, CreateUserFormData>} 
 *   The mutation object returned by `useMutation`, which includes methods and state for the mutation.
 *
 * @example
 * const { mutate, isLoading, isSuccess, data } = useCreateUserMutation();
 * mutate({ email: 'user@example.com', fullName: 'User', roleId: 'role', projectIds: [] });
 */
export const useCreateUserMutation = () => {
    const httpClient = useHttpClient();

    return useMutation({
        mutationKey: ['create-user'],
        mutationFn: (data: CreateUserFormData) =>
            httpClient.post<CreateUserMutationResponse>(CREATE_USER_ROUTE, data),
    });
};