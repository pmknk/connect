import { Route } from "react-router-dom";
import { Router } from "./router";
import { PROJECTS_ROUTES } from "./constants";

export default <Route path={`${PROJECTS_ROUTES.PROJECTS}/*`} element={<Router />} />;
