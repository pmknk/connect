import { ProjectsMainNavbarItem } from "./lib/components/ProjectsMainNavbarItem";
import Projects from "./lib/projects";

export const projects = () => ({
    name: 'projects',
    route: {
        path: '/projects',
        component: Projects
    },  
    slots: [
        {
            key: 'projectsMainNavbarItem',
            slot: 'navbarLeftMenuItem',
            component: ProjectsMainNavbarItem
        }
    ]
})