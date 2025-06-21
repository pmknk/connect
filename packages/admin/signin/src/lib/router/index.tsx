import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Login = lazy(() => import('../pages/Login'));

export const Router = () => {
    return (
        <Routes>
            <Route path="" element={<Login />} />
        </Routes>
    );
};
