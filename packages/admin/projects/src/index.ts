import { ProjectsAppBarButton } from './lib/components/ProjectsAppBarButton';
import Projects from './lib/projects';

const CORE_PRIVATE_ROUTES_SLOT_NAME = 'corePrivateRoutes';
const CORE_PRIVATE_ROUTES_SLOT_KEY = 'projectsPrivateRoutes';

const CORE_NAVBAR_LEFT_MENU_ITEM_SLOT_NAME = 'coreNavbarLeftMenuItem';
const CORE_NAVBAR_LEFT_MENU_ITEM_SLOT_KEY = 'projectsNavbarLeftMenuItem';

export const projects = () => ({
    name: 'projects',
    slots: [
        {
            key: CORE_PRIVATE_ROUTES_SLOT_KEY,
            slot: CORE_PRIVATE_ROUTES_SLOT_NAME,
            component: Projects
        },
        {
            key: CORE_NAVBAR_LEFT_MENU_ITEM_SLOT_KEY,
            slot: CORE_NAVBAR_LEFT_MENU_ITEM_SLOT_NAME,
            component: ProjectsAppBarButton
        }
    ]
});
