import { lazy } from "react"

export const signin = () => {
    return {
        name: 'signin',
        routes: [
            { 
                path: '/signin',
                component: lazy(() => import('./lib/signin')), 
            }
        ]
    }
}