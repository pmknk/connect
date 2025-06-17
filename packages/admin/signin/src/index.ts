import { createPlugin } from "@avyyx/admin-utils"
import { lazy } from "react"

export const createSigninPlugin = () => {
    return createPlugin({
        name: 'signin',
        routes: [
            { 
                path: '/signin',
                component: lazy(() => import('./lib/signin')), 
                isPublic: true 
            }
        ]
    })
}