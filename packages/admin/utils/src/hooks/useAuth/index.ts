import {
    useAppDispatch,
    useAppSelector,
    AuthState,
    resetAuthState,
    setAccessToken as setStoreAccessToken,
    setRefreshToken as setStoreRefreshToken
} from '../../store';

/**
 * Custom hook to manage authentication state in the Redux store.
 * Provides functions to set access and refresh tokens, and reset the auth state.
 *
 * @returns {Object} - An object containing the authentication state and methods to modify it.
 * @property {string | null} accessToken - The current access token.
 * @property {string | null} refreshToken - The current refresh token.
 * @property {number | null} accessTokenExpiresIn - Expiration timestamp of the access token.
 * @property {number | null} refreshTokenExpiresIn - Expiration timestamp of the refresh token.
 * @property {boolean} isAuthenticated - A boolean indicating if the user is authenticated (both tokens and their expiration timestamps are present).
 * @property {Function} setAccessToken - Function to set the access token and its expiration timestamp.
 * @property {Function} setRefreshToken - Function to set the refresh token and its expiration timestamp.
 * @property {Function} reset - Function to reset the authentication state in the Redux store.
 */
export const useAuth = () => {
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state.auth) as AuthState;

    /**
     * Sets the access token and its expiration timestamp in the Redux store.
     *
     * @param {string} accessToken - The access token to set.
     * @param {number} accessTokenExpiresIn - The expiration timestamp for the access token.
     */
    const setAccessToken = (
        accessToken: string,
        accessTokenExpiresIn: number
    ) => {
        dispatch(
            setStoreAccessToken({
                accessToken,
                accessTokenExpiresIn
            })
        );
    };

    /**
     * Sets the refresh token and its expiration timestamp in the Redux store.
     *
     * @param {string} refreshToken - The refresh token to set.
     * @param {number} refreshTokenExpiresIn - The expiration timestamp for the refresh token.
     */
    const setRefreshToken = (
        refreshToken: string,
        refreshTokenExpiresIn: number
    ) => {
        dispatch(
            setStoreRefreshToken({
                refreshToken,
                refreshTokenExpiresIn
            })
        );
    };

    /**
     * Resets the authentication state in the Redux store.
     */
    const reset = () => {
        dispatch(resetAuthState());
    };

    return {
        ...state,
        setAccessToken,
        setRefreshToken,
        reset,
        isAuthenticated:
            !!state.accessToken &&
            !!state.refreshToken &&
            state.accessTokenExpiresIn &&
            state.refreshTokenExpiresIn
    };
};
