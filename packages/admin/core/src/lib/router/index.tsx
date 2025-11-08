import { lazy, Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { renderElement, usePlugins } from '@content/admin-utils';
import { CORE_SLOTS } from '../constants';

const LazyMain = lazy(() => import('../pages/Main'));

export const Router = () => {
    const { getComponentsBySlot } = usePlugins();

    const publicRoutes =
        getComponentsBySlot(CORE_SLOTS.CORE_PUBLIC_ROUTES) ?? [];
    const privateRoutes =
        getComponentsBySlot(CORE_SLOTS.CORE_PRIVATE_ROUTES) ?? [];

    return (
        <BrowserRouter>
            <Routes>
                {publicRoutes.map(({ key, component, props }) => (
                    <Fragment key={key}>
                        {renderElement(component, props)}
                    </Fragment>
                ))}

                <Route path="/" element={<LazyMain />}>
                    {privateRoutes.map(({ key, component, props }) => (
                        <Fragment key={key}>
                            {renderElement(component, props)}
                        </Fragment>
                    ))}
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
