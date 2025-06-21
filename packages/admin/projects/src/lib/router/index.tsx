import { lazy } from "react"
import { Route, Routes } from "react-router-dom"

const LazyProjects = lazy(() => import('../pages/Projects'))

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<LazyProjects />} />
        </Routes>
    )
}
