export * from './lib/content-library';
import { ContentLibrarySidebarButton } from "./lib/components/ProjectsSidebarButton";

const PROJECTS_SIDEBAR_MENU_ITEMS_SLOT_NAME = 'projectsSidebarMenuItems';
const PROJECTS_SIDEBAR_MENU_ITEMS_SLOT_KEY = 'contentLibrarySidebarMenuItems';

export const contentLibrary = () => ({
    name: 'contentLibrary',
    slots: [
        {
            key: PROJECTS_SIDEBAR_MENU_ITEMS_SLOT_KEY,
            slot: PROJECTS_SIDEBAR_MENU_ITEMS_SLOT_NAME,
            component: ContentLibrarySidebarButton
        }
    ]
});
