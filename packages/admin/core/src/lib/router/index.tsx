import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { usePlugins } from '@avyyx/admin-utils';

export const Router = () => {
    const { getRoutes } = usePlugins();

    const publicRoutes = (getRoutes() ?? []).filter((r) => r.isPublic);
    // const privateRoutes = (getRoutes() ?? []).filter((r) => !r.isPublic);

    return (
        <BrowserRouter>
            <Routes>
                {publicRoutes.map(({ path, component: Component }) => (
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
