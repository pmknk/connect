

import Box from '@mui/material/Box';

import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ContentLibrarySidebar } from '../../components/ContentLibrarySidebar';

const LazyCollection = lazy(() => import('../Collection'));

const ContentLibrary = () => {
    return (
        <Box sx={{ display: 'flex', height: '100%' }}>
            <ContentLibrarySidebar />
            <Routes>
                <Route path=":collectionSlug" element={<LazyCollection />} />
                <Route index element={<div>Collections</div>} />
            </Routes>
        </Box>
    );
};

export default ContentLibrary;
