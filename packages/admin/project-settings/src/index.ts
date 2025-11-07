export * from './lib/project-settings';
import ProjectSettings from "./lib/project-settings";
import { ProjectSettingsSidebarButton } from "./lib/components/ProjectSettingsSidebarButton";

const PROJECTS_SIDEBAR_MENU_ITEMS_SLOT_NAME = 'projectSidebarMenuItems';
const PROJECTS_SIDEBAR_MENU_ITEMS_SLOT_KEY = 'projectSettingsSidebarMenuItems';
const PROJECT_ROUTES_SLOT_NAME = 'projectRoutes';
const PROJECT_ROUTES_SLOT_KEY = 'projectSettingsRoutes';

export const projectSettings = () => ({
    name: 'projectSettings',
    slots: [
        {
            key: PROJECT_ROUTES_SLOT_KEY,
            slot: PROJECT_ROUTES_SLOT_NAME,
            component: ProjectSettings
        },
        {
            key: PROJECTS_SIDEBAR_MENU_ITEMS_SLOT_KEY,
            slot: PROJECTS_SIDEBAR_MENU_ITEMS_SLOT_NAME,
            component: ProjectSettingsSidebarButton
        }
    ]
});
