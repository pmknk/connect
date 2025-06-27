import { Outlet } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useErrorBoundary } from '@avyyx/admin-utils';
import { FullPageLoader } from '@avyyx/admin-ui';
import { MainNavbar } from '../../component/MainNavbar';
import { useMeQuery } from '../../hooks/useMeQuery';
import { usePermissionsQuery } from '../../hooks/usePermissionsQuery';
import { useEffect } from 'react';

const Main = () => {
    const { showError } = useErrorBoundary();
    const { isLoading: isLoadingMe, error: errorMe } = useMeQuery();
    const { isLoading: isLoadingPermissions, error: errorPermissions } =
        usePermissionsQuery();

    useEffect(() => {
        if (errorMe || errorPermissions) {
            showError(errorMe || errorPermissions);
        }
    }, [errorMe, errorPermissions, showError]);

    if (isLoadingMe || isLoadingPermissions) {
        return (
            <FullPageLoader
                showLogo
                loadingText={
                    <FormattedMessage
                        id="main.loading"
                        defaultMessage="Please wait while we load the application..."
                    />
                }
            />
        );
    }

    return (
        <div className="h-full">
            <MainNavbar />
            <div className="h-full">
                <Outlet />
            </div>
        </div>
    );
};

export default Main;
