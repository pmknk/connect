import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PermissionState = {
    id: string;
    action: string;
    resource: string;
}[];

const initialState: PermissionState = [];

/**
 * Redux slice for managing permissions state
 */
export const permissionSlice = createSlice({
    name: 'permissions',
    initialState,
    reducers: {
        /**
         * Sets the permissions array
         * @param state - Current permissions state
         * @param action - Action containing the permissions array payload
         */
        setPermissions: (
            _state: PermissionState,
            { payload }: PayloadAction<PermissionState>
        ) => {
            return payload;
        },
        /**
         * Resets the permissions state to initial value (empty array)
         */
        resetPermissionState: () => initialState
    }
});

export const { setPermissions, resetPermissionState } = permissionSlice.actions;
export default permissionSlice.reducer;
