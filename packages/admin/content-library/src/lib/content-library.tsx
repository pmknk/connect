import { Route } from "react-router-dom";
import { Router } from './router'
import { CONTENT_LIBRARY_ROUTES } from "./constants";

export default <Route path={`${CONTENT_LIBRARY_ROUTES.CONTENT}/*`} element={<Router />} />;
