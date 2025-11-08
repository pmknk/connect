import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const LazyUsers = lazy(() => import('../pages/Users'));
const LazyUser = lazy(() => import('../pages/User'));

export const Router = () => {
    return (
        <Routes>
            <Route path="/:id" element={<LazyUser />} />
            <Route path="/" element={<LazyUsers />} />
        </Routes>
    );
};
