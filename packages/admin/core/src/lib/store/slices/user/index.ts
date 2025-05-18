import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const UserStatus = {
    ACTIVE: 'ACTIVE',
    DEACTIVATED: 'DEACTIVATED',
    NONE: 'NONE'
} as const;

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

export type User = {
    readonly id: string;
    email: string;
    fullName: string;
    status: UserStatus;
    createdAt: string;
    updatedAt: string;
};

type UserState = User

const initialState: UserState = {
    id: '',
    email: '',
    fullName: '',
    status: UserStatus.NONE,
    createdAt: '',
    updatedAt: ''
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
