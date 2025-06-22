import { useCallback } from 'react';
import {
    setPermissions as setStorePermissions,
    resetPermissionState as resetStorePermission,
    PermissionState,
    useAppDispatch,
    useAppSelector
} from '../../store';

/**
 * Hook for managing permission state in the Redux store
 */
export const usePermissions = () => {
    const dispatch = useAppDispatch();
    const permission = useAppSelector((state) => state.permission);

    const setPermissions = useCallback(
        (permissionsData: PermissionState) => {
            dispatch(setStorePermissions(permissionsData));
        },
        [dispatch]
    );

    const reset = useCallback(() => {
        dispatch(resetStorePermission());
    }, [dispatch]);

    return {
        permission,
        setPermissions,
        reset
    };
};
