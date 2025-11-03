import { lazy } from "react"
import { Route, Routes } from "react-router-dom"

const LazyContentLibrary = lazy(() => import('../pages/ContentLibrary'))

export const Router = () => (
    <Routes>
        <Route path="/" element={<LazyContentLibrary />} />
    </Routes>
)


