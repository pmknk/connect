import { ProjectInsightsSidebarButton } from "./lib/components/ProjectsSidebarButton";

const PROJECTS_SIDEBAR_MENU_ITEMS_SLOT_NAME = 'projectsSidebarMenuItems';
const PROJECTS_SIDEBAR_MENU_ITEMS_SLOT_KEY = 'projectInsightsSidebarMenuItems';

export const projectInsights = () => ({
    name: 'projectInsights',
    slots: [
        {
            key: PROJECTS_SIDEBAR_MENU_ITEMS_SLOT_KEY,
            slot: PROJECTS_SIDEBAR_MENU_ITEMS_SLOT_NAME,
            component: ProjectInsightsSidebarButton
        }
    ]
})