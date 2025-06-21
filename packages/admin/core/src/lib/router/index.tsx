import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { usePlugins } from '@avyyx/admin-utils';

export const Router = () => {
    const { getRoutes } = usePlugins();

    return (
        <BrowserRouter>
            <Routes>
                {getRoutes().map(({ path, component: Component }) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            <Suspense fallback={null}>
                                <Component />
                            </Suspense>
                        }
                    />
                ))}
            </Routes>
        </BrowserRouter>
    );
};
