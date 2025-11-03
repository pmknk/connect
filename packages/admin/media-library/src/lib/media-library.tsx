import { Route } from "react-router-dom";
import { Router } from './router'
import { MEDIA_LIBRARY_ROUTES } from "./constants";

export default <Route path={`${MEDIA_LIBRARY_ROUTES.MEDIA}/*`} element={<Router />} />;
