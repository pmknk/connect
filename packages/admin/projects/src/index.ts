import { ProjectsAppBarButton } from "./lib/components/ProjectsAppBarButton";
import { PROJECTS_ROUTE } from "./lib/constants";
import Projects from "./lib/projects";

export const projects = () => ({
    name: 'projects',
    route: {
        path: `${PROJECTS_ROUTE}/*`,
        component: Projects
    },  
    slots: [
        {
            key: 'projectsAppBarButton',
            slot: 'navbarLeftMenuItem',
            component: ProjectsAppBarButton
        }
    ]
})