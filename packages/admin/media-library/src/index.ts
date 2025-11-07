export * from './lib/media-library';
import MediaLibrary from "./lib/media-library";
import { MediaLibrarySidebarButton } from "./lib/components/MediaLibrarySidebarButton";

const PROJECTS_SIDEBAR_MENU_ITEMS_SLOT_NAME = 'projectSidebarMenuItems';
const PROJECTS_SIDEBAR_MENU_ITEMS_SLOT_KEY = 'mediaLibrarySidebarMenuItems';
const PROJECT_ROUTES_SLOT_NAME = 'projectRoutes';
const PROJECT_ROUTES_SLOT_KEY = 'mediaLibraryRoutes';

export const mediaLibrary = () => ({
    name: 'mediaLibrary',
    slots: [
        {
            key: PROJECT_ROUTES_SLOT_KEY,
            slot: PROJECT_ROUTES_SLOT_NAME,
            component: MediaLibrary
        },
        {
            key: PROJECTS_SIDEBAR_MENU_ITEMS_SLOT_KEY,
            slot: PROJECTS_SIDEBAR_MENU_ITEMS_SLOT_NAME,
            component: MediaLibrarySidebarButton
        }
    ]
});
