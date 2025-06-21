import { Outlet } from 'react-router-dom'
import { MainNavbar } from '../../component/MainNavbar';

const Main = () => {
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
