import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const LazyMediaLibrary = lazy(() => import('../pages/MediaLibrary'));

export const Router = () => (
    <Routes>
        <Route path="/" element={<LazyMediaLibrary />} />
    </Routes>
);
