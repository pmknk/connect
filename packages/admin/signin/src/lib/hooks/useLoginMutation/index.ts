import { useMutation } from '@tanstack/react-query';
import { useAuth, useErrorBoundary, useHttpClient } from '@avyyx/admin-utils';
import { LoginFormData } from '../useLoginForm';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useState } from 'react';

export type LoginMutationResponse = {
    data: {
        accessToken: string;
        refreshToken: string;
        accessTokenExpiresIn: number;
        refreshTokenExpiresIn: number;
    };
};

/**
 * Custom hook for handling login mutation
 *
 * @returns A mutation object for login operations
 *
 * @example
 * ```tsx
 * const loginMutation = useLoginMutation()
 *
 * const handleLogin = async (formData: LoginFormData) => {
 *   try {
 *     await loginMutation.mutateAsync(formData)
 *     // Handle successful login
 *   } catch (error) {
 *     // Handle login error
 *   }
 * }
 * ```
 */
const SIGNIN_ROUTE = '/identity/auth/signin';

export const useLoginMutation = () => {
    const httpClient = useHttpClient();
    const navigate = useNavigate();

    const { showError } = useErrorBoundary();
    const { setAccessToken, setRefreshToken } = useAuth();
    const [isUnauthorized, setIsUnauthorized] = useState(false);

    return {
        isUnauthorized,
        ...useMutation({
            mutationKey: ['login'],
            mutationFn: async (
                data: LoginFormData
            ): Promise<LoginMutationResponse> => {
                const response = await httpClient.post<LoginMutationResponse>(
                    SIGNIN_ROUTE,
                    data
                );
                return response.data;
            },
            onSuccess: ({ data }) => {
                const {
                    accessToken,
                    refreshToken,
                    accessTokenExpiresIn,
                    refreshTokenExpiresIn
                } = data;

                setAccessToken(accessToken, accessTokenExpiresIn);
                setRefreshToken(refreshToken, refreshTokenExpiresIn);
                navigate('/');
            },
            onError(error) {
                if (
                    error instanceof AxiosError &&
                    error.response?.status === 401
                ) {
                    setIsUnauthorized(true);
                } else {
                    showError(error);
                }
            }
        })
    };
};
