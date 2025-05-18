import { BrowserRouter, Route, Routes } from "react-router-dom";
import { usePluginRegistry } from "../hooks/usePluginRegistry";
import { Suspense } from "react";

export const Router = () => {

    const { routes } = usePluginRegistry()

    const publicRoutes = (routes ?? []).filter(r => r.isPublic)
    const privateRoutes = (routes ?? []).filter(r => !r.isPublic)

    return (
        <BrowserRouter>
            <Routes>
            {publicRoutes.map(({ path, component: Component }) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        <Suspense fallback={<div>Loading…</div>}>
                            <Component />
                        </Suspense>
                    }
                />
            ))}
            </Routes>
        </BrowserRouter>
    )
}