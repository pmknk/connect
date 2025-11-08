import { Route } from 'react-router-dom';
import { Router } from './router';
import { PROJECT_SETTINGS_ROUTES } from './constants';

export default (
    <Route
        path={`${PROJECT_SETTINGS_ROUTES.SETTINGS}/*`}
        element={<Router />}
    />
);
