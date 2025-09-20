import { useAuth } from '@avyyx/admin-utils';
import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';


const Login = lazy(() => import('../pages/Login'));
const Join = lazy(() => import('../pages/Join'));

export const Router = () => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <Routes>
            <Route path="join" element={<Join />} />
            <Route path="" element={<Login />} />
        </Routes>
    );
};
