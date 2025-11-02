export * from './lib/media-library';
import { MediaLibrarySidebarButton } from "./lib/components/ProjectsSidebarButton";

const PROJECTS_SIDEBAR_MENU_ITEMS_SLOT_NAME = 'projectsSidebarMenuItems';
const PROJECTS_SIDEBAR_MENU_ITEMS_SLOT_KEY = 'mediaLibrarySidebarMenuItems';

export const mediaLibrary = () => ({
    name: 'mediaLibrary',
    slots: [
        {
            key: PROJECTS_SIDEBAR_MENU_ITEMS_SLOT_KEY,
            slot: PROJECTS_SIDEBAR_MENU_ITEMS_SLOT_NAME,
            component: MediaLibrarySidebarButton
        }
    ]
});
