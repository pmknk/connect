import { Route } from 'react-router-dom';
import { Router } from './router';
import { PROJECT_INSIGHTS_ROUTES } from './constants';

export default (
    <Route
        path={`${PROJECT_INSIGHTS_ROUTES.INSIGHTS}/*`}
        element={<Router />}
    />
);
