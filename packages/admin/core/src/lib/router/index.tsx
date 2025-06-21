import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { renderElement, usePlugins } from '@avyyx/admin-utils';

const LazyMain = lazy(() => import('../pages/Main'));

export const Router = () => {
    const { getPublicRoutes, getPrivateRoutes } = usePlugins();
    return (
        <BrowserRouter>
            <Routes>
                {getPublicRoutes().map(({ path, component, props }) => (
                    <Route
                        key={path}
                        path={path}
                        element={renderElement(component, props)}
                    />
                ))}
                <Route
                    path="/"
                    element={<LazyMain />}
                >
                    {getPrivateRoutes().map(({ path, component, props }) => (
                        <Route
                            key={path}
                            path={path}
                            element={renderElement(component, props)}
                        />
                    ))}
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
