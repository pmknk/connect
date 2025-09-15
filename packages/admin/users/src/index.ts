import { UsersAppBarButton } from "./lib/components/UsersAppBarButton";
import Users from "./lib/users";

export const users = () => ({
    name: 'users',
    route: {
        path: '/users/*',
        component: Users
    },  
    slots: [
        {
            key: 'usersAppBarButton',
            slot: 'navbarLeftMenuItem',
            component: UsersAppBarButton
        }
    ]
})