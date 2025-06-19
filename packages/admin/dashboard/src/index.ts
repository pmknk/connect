
import { lazy } from "react"

export const dashboard = () => {
    return {
        name: 'dashboard',
        routes: [
            { 
                path: '/', 
                component: lazy(() => import('./lib')),
            }
        ]
    }
}