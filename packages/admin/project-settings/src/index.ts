export * from './lib/project-settings';
import { ProjectSettingsSidebarButton } from "./lib/components/ProjectsSidebarButton";

const PROJECTS_SIDEBAR_MENU_ITEMS_SLOT_NAME = 'projectsSidebarMenuItems';
const PROJECTS_SIDEBAR_MENU_ITEMS_SLOT_KEY = 'projectSettingsSidebarMenuItems';

export const projectSettings = () => ({
    name: 'projectSettings',
    slots: [
        {
            key: PROJECTS_SIDEBAR_MENU_ITEMS_SLOT_KEY,
            slot: PROJECTS_SIDEBAR_MENU_ITEMS_SLOT_NAME,
            component: ProjectSettingsSidebarButton
        }
    ]
});
