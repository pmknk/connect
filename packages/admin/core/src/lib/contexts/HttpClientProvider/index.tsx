import axios, {
    AxiosInstance,
    AxiosResponse,
    AxiosError,
    InternalAxiosRequestConfig
} from 'axios';
import { createContext, useContext, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from '../../store/store';
import { resetAuthState, setAccessToken } from '../../store/slices/auth';

let isRefreshing = false;
let requestQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: any) => void;
}> = [];

/**
 * Processes the queue of requests waiting for a new access token.
 * Resolves or rejects the promises in the queue depending on whether a new token was received.
 *
 * @param {any} error - The error that occurred, if any.
 * @param {string | null} token - The new access token, if received.
 */
const processQueue = (error: any, token: string | null = null) => {
    requestQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve(token as string);
        }
    });

    requestQueue = [];
};

const axiosInstance: AxiosInstance = axios.create({});

/**
 * Function to refresh the access token using the refresh token from the store.
 *
 * @returns {Promise<{ accessToken: string, accessTokenExpiresIn: number }>} - The new access token and its expiration timestamp.
 */
const refresh = async (
    baseUrl: string
): Promise<{
    accessToken: string;
    accessTokenExpiresIn: number;
}> => {
    const refreshResponse = await axios.get(
        `${baseUrl}/admin/identity/auth/refresh`,
        {
            headers: {
                Authorization: `Bearer ${store.getState().auth.refreshToken}`
            }
        }
    );

    return refreshResponse.data.data;
};

/**
 * Axios request interceptor that checks the access token expiration before each request.
 * If the token is expired, it refreshes the token and processes queued requests.
 */
axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const { accessToken, accessTokenExpiresIn } = store.getState().auth;
        const now = Date.now();

        if (accessTokenExpiresIn && accessTokenExpiresIn < now) {
            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const {
                        accessToken: newAccessToken,
                        accessTokenExpiresIn: newAccessTokenExpirationTimestamp
                    } = await refresh(axiosInstance.defaults.baseURL!);
                    store.dispatch(
                        setAccessToken({
                            accessToken: newAccessToken,
                            accessTokenExpiresIn:
                                newAccessTokenExpirationTimestamp
                        })
                    );

                    config.headers![
                        'Authorization'
                    ] = `Bearer ${newAccessToken}`;
                    processQueue(null, newAccessToken);
                } catch (error) {
                    processQueue(error, null);
                    throw error;
                } finally {
                    isRefreshing = false;
                }
            } else {
                return new Promise((resolve, reject) => {
                    requestQueue.push({
                        resolve: (token: string) => {
                            config.headers![
                                'Authorization'
                            ] = `Bearer ${token}`;
                            resolve(config);
                        },
                        reject: (error: AxiosError) => {
                            reject(error);
                        }
                    });
                });
            }
        } else {
            config.headers!['Authorization'] = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

/**
 * Axios response interceptor to handle 401 errors.
 * If the user is unauthorized, the auth state is reset and the user is redirected to the login page.
 */
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const LOGIN_URL = '/signin';

        const { status } = error.response!;
        if (status === 401) {
            store.dispatch(resetAuthState());
            if (!window.location.href.includes(LOGIN_URL)) {
                window.location.href = LOGIN_URL;
            }

            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

const HttpClientContext = createContext<AxiosInstance>(axiosInstance);

/**
 * Custom hook to access the Axios instance from the context.
 *
 * @returns {AxiosInstance} - The Axios instance with request and response interceptors.
 */
export const useHttpClient = (): AxiosInstance => {
    return useContext(HttpClientContext);
};

/**
 * Provider component for Axios instance. Wrap your app in this provider to use the `useAxios` hook.
 *
 * @param {{ children: ReactNode }} props - The children components to wrap inside the provider.
 * @returns {JSX.Element} - The provider wrapping the application.
 */
export const HttpClientProvider = ({
    api,
    children
}: {
    api: string;
    children: ReactNode;
}) => {
    axiosInstance.defaults.baseURL = api;
    const queryClient = new QueryClient();

    return (
        <HttpClientContext.Provider value={axiosInstance}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </HttpClientContext.Provider>
    );
};
