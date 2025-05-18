import { Route } from "react-router-dom"

import { Routes } from "react-router-dom"
import { lazy } from "react"
const Login = lazy(() => import('../pages/Login'))

export const Router = () => {
    return (
        <Routes>
            <Route 
                path="" 
                element={<Login />} 
            />
        </Routes>
    )
}