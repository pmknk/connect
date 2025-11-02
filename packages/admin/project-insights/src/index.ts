import { ProjectInsightsSidebarButton } from "./lib/components/ProjectsSidebarButton";

export const projectInsights = () => ({
    name: 'projectInsights',
    // route: {
    //     path: '/project-insights/*',
    //     component: ProjectInsights
    // }
    slots: [
        {
            key: 'projectInsightsSidebarButton',
            slot: 'projectSidebarMenuItem',
            component: ProjectInsightsSidebarButton
        }
    ]
})