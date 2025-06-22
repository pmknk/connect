import { Outlet } from 'react-router-dom'
import { FullPageLoader } from '@avyyx/admin-ui';
import { MainNavbar } from '../../component/MainNavbar';
import { useMeQuery } from '../../hooks/useMeQuery';
import { usePermissionsQuery } from '../../hooks/usePermissionsQuery';
import { FormattedMessage } from 'react-intl';

const Main = () => {
    const { isLoading: isLoadingMe, error: errorMe } = useMeQuery();
    const { isLoading: isLoadingPermissions, error: errorPermissions } = usePermissionsQuery();


    if (isLoadingMe || isLoadingPermissions) {
        return <FullPageLoader
            showLogo
            loadingText={
                <FormattedMessage
                    id="main.loading"
                    defaultMessage="Please wait while we load the application..."
                />
            }
        />;
    }

    if (errorMe || errorPermissions) {
        return <div>Error</div>;
    }
    return (
        <div>
            <MainNavbar />
            <div className="overflow-y-auto h-full">
                <Outlet />
            </div>
        </div>
    );
};

export default Main;
