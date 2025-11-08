export * from './lib/content-library';
import ContentLibrary from './lib/content-library';
import { ContentLibrarySidebarButton } from './lib/components/ContentLibrarySidebarButton';

const PROJECTS_SIDEBAR_MENU_ITEMS_SLOT_NAME = 'projectSidebarMenuItems';
const PROJECTS_SIDEBAR_MENU_ITEMS_SLOT_KEY = 'contentLibrarySidebarMenuItems';
const PROJECT_ROUTES_SLOT_NAME = 'projectRoutes';
const PROJECT_ROUTES_SLOT_KEY = 'contentLibraryRoutes';

export const contentLibrary = () => ({
    name: 'contentLibrary',
    slots: [
        {
            key: PROJECT_ROUTES_SLOT_KEY,
            slot: PROJECT_ROUTES_SLOT_NAME,
            component: ContentLibrary
        },
        {
            key: PROJECTS_SIDEBAR_MENU_ITEMS_SLOT_KEY,
            slot: PROJECTS_SIDEBAR_MENU_ITEMS_SLOT_NAME,
            component: ContentLibrarySidebarButton
        }
    ]
});
