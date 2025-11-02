import { UsersAppBarButton } from "./lib/components/UsersAppBarButton";
import Users from "./lib/users";

const CORE_PRIVATE_ROUTES_SLOT_NAME = 'corePrivateRoutes';
const CORE_PRIVATE_ROUTES_SLOT_KEY = 'usersPrivateRoutes';

const CORE_NAVBAR_LEFT_MENU_ITEM_SLOT_NAME = 'coreNavbarLeftMenuItem';
const CORE_NAVBAR_LEFT_MENU_ITEM_SLOT_KEY = 'usersNavbarLeftMenuItem';

export const users = () => ({
    name: 'users',
    slots: [
        {
            key: CORE_PRIVATE_ROUTES_SLOT_KEY,
            slot: CORE_PRIVATE_ROUTES_SLOT_NAME,
            component: Users
        },
        {
            key: CORE_NAVBAR_LEFT_MENU_ITEM_SLOT_KEY,
            slot: CORE_NAVBAR_LEFT_MENU_ITEM_SLOT_NAME,
            component: UsersAppBarButton
        }
    ]
})