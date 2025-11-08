import { ProjectInsightsSidebarButton } from './lib/components/ProjectInsightsSidebarButton';
import ProjectInsights from './lib/project-insights';

const PROJECTS_SIDEBAR_MENU_ITEMS_SLOT_NAME = 'projectSidebarMenuItems';
const PROJECTS_SIDEBAR_MENU_ITEMS_SLOT_KEY = 'projectInsightsSidebarMenuItems';

const PROJECT_INSIGHTS_ROUTES_SLOT_NAME = 'projectRoutes';
const PROJECT_INSIGHTS_ROUTES_SLOT_KEY = 'projectInsightsRoutes';

export const projectInsights = () => ({
    name: 'projectInsights',
    slots: [
        {
            key: PROJECT_INSIGHTS_ROUTES_SLOT_KEY,
            slot: PROJECT_INSIGHTS_ROUTES_SLOT_NAME,
            component: ProjectInsights
        },
        {
            key: PROJECTS_SIDEBAR_MENU_ITEMS_SLOT_KEY,
            slot: PROJECTS_SIDEBAR_MENU_ITEMS_SLOT_NAME,
            component: ProjectInsightsSidebarButton
        }
    ]
});
