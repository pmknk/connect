import { createSlice } from '@reduxjs/toolkit';

export type AuthState = {
    /**
     * The access token used for authentication, or null if not authenticated.
     */
    accessToken: string | null;

    /**
     * The refresh token used to obtain a new access token, or null if not available.
     */
    refreshToken: string | null;

    /**
     * The expiration timestamp (in milliseconds since the epoch) of the access token, or null if not available.
     */
    accessTokenExpiresIn: number | null;

    /**
     * The expiration timestamp (in milliseconds since the epoch) of the refresh token, or null if not available.
     */
    refreshTokenExpiresIn: number | null;
};

const initialState: AuthState = {
    accessToken: null,
    refreshToken: null,
    accessTokenExpiresIn: null,
    refreshTokenExpiresIn: null
};

type PickAccessToken = {
    payload: {
        accessToken: AuthState['accessToken'];
        accessTokenExpiresIn: AuthState['accessTokenExpiresIn'];
    };
};

type PickRefreshToken = {
    payload: {
        refreshToken: AuthState['refreshToken'];
        refreshTokenExpiresIn: AuthState['refreshTokenExpiresIn'];
    };
};

/**
 * A slice for managing the authentication state in the Redux store.
 */
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        /**
         * Resets the authentication state to its initial state.
         *
         * @returns {AuthState} The initial state.
         */
        resetAuthState: () => initialState,

        /**
         * Sets the access token and its expiration timestamp in the state.
         *
         * @param {AuthState} state - The current state of the slice.
         * @param {PickAccessToken} action - The action object containing the access token and its expiration timestamp.
         */
        setAccessToken: (state: AuthState, { payload }: PickAccessToken) => {
            state.accessToken = payload.accessToken;
            state.accessTokenExpiresIn = payload.accessTokenExpiresIn;
        },

        /**
         * Sets the refresh token and its expiration timestamp in the state.
         *
         * @param {AuthState} state - The current state of the slice.
         * @param {PickRefreshToken} action - The action object containing the refresh token and its expiration timestamp.
         */
        setRefreshToken: (state: AuthState, { payload }: PickRefreshToken) => {
            state.refreshToken = payload.refreshToken;
            state.refreshTokenExpiresIn = payload.refreshTokenExpiresIn;
        }
    }
});

/**
 * Action to reset the authentication state to its initial state.
 * @returns {void}
 */
export const { resetAuthState, setAccessToken, setRefreshToken } =
    authSlice.actions;

export default authSlice.reducer;
