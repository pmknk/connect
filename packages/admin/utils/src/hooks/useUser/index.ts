import { useCallback } from 'react';
import { useAppDispatch, useAppSelector, type UserState } from '../../store';
import {
    setUser as setStoreUser,
    resetUserState as resetStoreUser
} from '../../store';

/**
 * Custom hook to manage user state in the Redux store.
 * Provides functions to set user data and reset the user state.
 *
 * @returns {Object} - An object containing the user state and methods to modify it.
 * @property {UserState} user - The current user state from the Redux store.
 * @property {Function} setUser - Function to update the user data in the Redux store.
 * @property {Function} reset - Function to reset the user state in the Redux store.
 */
export const useUser = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);

    /**
     * Updates the user data in the Redux store.
     *
     * @param {Partial<UserState>} userData - Partial user data to update in the store.
     */
    const setUser = useCallback(
        (userData: Partial<UserState>) => {
            dispatch(setStoreUser(userData));
        },
        [dispatch]
    );

    /**
     * Resets the user state in the Redux store to initial values.
     */
    const reset = useCallback(() => {
        dispatch(resetStoreUser());
    }, [dispatch]);

    return {
        user,
        setUser,
        reset
    };
};
