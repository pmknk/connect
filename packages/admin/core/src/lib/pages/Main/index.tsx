import { Outlet } from 'react-router-dom'
import { MainNavbar } from '../../component/MainNavbar';
import { useMeQuery } from '../../hooks/useMeQuery';
import { usePermissionsQuery } from '../../hooks/usePermissionsQuery';

const Main = () => {
    const { isLoading: isLoadingMe, error: errorMe } = useMeQuery();
    const { isLoading: isLoadingPermissions, error: errorPermissions } = usePermissionsQuery();


    if (isLoadingMe || isLoadingPermissions) {
        return <div>Loading...</div>;
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
