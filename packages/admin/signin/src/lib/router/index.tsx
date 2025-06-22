import { useAuth } from '@avyyx/admin-utils';
import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const Login = lazy(() => import('../pages/Login'));

export const Router = () => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <Routes>
            <Route path="" element={<Login />} />
        </Routes>
    );
};
