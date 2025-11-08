import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const LazyProjectSettings = lazy(() => import('../pages/ProjectSettings'));

export const Router = () => (
    <Routes>
        <Route path="/" element={<LazyProjectSettings />} />
    </Routes>
);
