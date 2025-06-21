import { UsersMainNavbarItem } from "./lib/components/UsersMainNavbarItem";
import Users from "./lib/users";

export const users = () => ({
    name: 'users',
    route: {
        path: '/users',
        component: Users
    },  
    slots: [
        {
            key: 'usersMainNavbarItem',
            slot: 'navbarLeftMenuItem',
            component: UsersMainNavbarItem
        }
    ]
})