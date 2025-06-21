import { lazy } from "react"
import { Route, Routes } from "react-router-dom"

const LazyUsers = lazy(() => import('../pages/Users'))

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<LazyUsers />} />
        </Routes>
    )
}
