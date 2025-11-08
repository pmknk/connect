import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const LazyProjectInsights = lazy(() => import('../pages/ProjectInsights'));

export const Router = () => (
    <Routes>
        <Route path="/" element={<LazyProjectInsights />} />
    </Routes>
);
