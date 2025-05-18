import { createSlice } from '@reduxjs/toolkit';

/**
 * @typedef {Object} MetaState
 * @property {string | null} appVersion - The current application version.
 */
export type MetaState = {
    appVersion: string | null;
    nodeVersion?: string | null;
    environment?: string | null;
};

/**
 * The initial state of the meta slice.
 *
 * @type {MetaState}
 */
const initialState: MetaState = {
    appVersion: null,
    nodeVersion: null,
    environment: null
};

/**
 * Redux slice for managing application metadata.
 */
export const metaSlice = createSlice({
    name: 'meta',
    initialState,
    reducers: {
        /**
         * Resets the meta state to its initial values.
         *
         * @returns {MetaState} The initial state.
         */
        resetMetaState: () => initialState,

        /**
         * Sets the application version in the meta state.
         *
         * @param {MetaState} state - The current state.
         * @param {{ payload: string }} action - The action containing the new app version.
         */
        setAppVersion: (state, { payload }: { payload: string }) => {
            state.appVersion = payload;
        },

        /**
         * Sets the node version in the meta state.
         *
         * @param {MetaState} state - The current state.
         * @param {{ payload: string }} action - The action containing the new node version.
         */
        setNodeVersion: (state, { payload }: { payload: string }) => {
            state.nodeVersion = payload;
        },

        /**
         * Sets the environment in the meta state.
         *
         * @param {MetaState} state - The current state.
         * @param {{ payload: string }} action - The action containing the new environment.
         */
        setEnvironment: (state, { payload }: { payload: string }) => {
            state.environment = payload;
        }
    }
});

/**
 * Redux actions for the meta slice.
 */
export const { setAppVersion, resetMetaState, setNodeVersion, setEnvironment } =
    metaSlice.actions;

/**
 * The reducer for the meta slice.
 */
export default metaSlice.reducer;
