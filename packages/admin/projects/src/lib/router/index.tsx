import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const LazyProjects = lazy(() => import('../pages/Projects'));
const LazyProject = lazy(() => import('../pages/Project'));

export const Router = () => {
    return (
        <Routes>
            <Route path="/:projectId/*" element={<LazyProject />} />
            <Route path="/" element={<LazyProjects />} />
        </Routes>
    );
};
