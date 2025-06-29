import { ProjectsAppBarButton } from "./lib/components/ProjectsAppBarButton";
import Projects from "./lib/projects";

export const projects = () => ({
    name: 'projects',
    route: {
        path: '/projects',
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