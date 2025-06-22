import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
    id: string | null;
    email: string | null;
    fullName: string | null;
    createdAt: string | null;
    updatedAt: string | null;
};

const initialState: UserState = {
    id: null,
    email: null,
    fullName: null,
    createdAt: null,
    updatedAt: null
};

/**
 * Redux slice for managing the current user's state
 */
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        /**
         * Updates the current user's data
         * @param state - Current user state
         * @param action - Action containing the user data payload
         */
        setUser: (
            state: UserState,
            { payload }: PayloadAction<Partial<UserState>>
        ) => {
            return {
                ...(state ? state : {}),
                ...payload
            } as UserState;
        },
        /**
         * Resets the user state to initial value (null)
         */
        resetUserState: () => initialState
    }
});

export const { setUser, resetUserState } = userSlice.actions;
export default userSlice.reducer;
