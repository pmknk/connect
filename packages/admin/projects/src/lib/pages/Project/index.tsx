import Box from '@mui/material/Box';

import { renderElement, usePlugins } from '@content/admin-utils';

import { Fragment } from 'react';
import { Routes, useLocation, useNavigate, useParams } from 'react-router-dom';

import { useProjectBySlugOrIdQuery } from '../../hooks/useProjectBySlugOrIdQuery';
import { ProjectSidebar } from '../../components/ProjectSidebar';
import { PROJECTS_SLOTS } from '../../constants';
import { useRedirectToFirstProjectRoute } from '../../hooks/useRedirectToFirstProjectRoute';

const Project = () => {
    const { projectSlug: projectParam } = useParams();
    const { data: project } = useProjectBySlugOrIdQuery(projectParam);
    const location = useLocation();
    const navigate = useNavigate();

    const { getComponentsBySlot } = usePlugins();

    const projectSidebarMenuItems =
        getComponentsBySlot(PROJECTS_SLOTS.PROJECT_SIDEBAR_MENU_ITEMS) ?? [];
    const projectRoutes =
        getComponentsBySlot(PROJECTS_SLOTS.PROJECT_ROUTES) ?? [];

    useRedirectToFirstProjectRoute({
        projectSlug: project?.slug ?? projectParam,
        projectRoutes
    });

    // Redirect from id-based URL to canonical slug-based URL if needed
    if (project && projectParam && project.slug && projectParam !== project.slug) {
        const remainder = location.pathname.replace(`/projects/${projectParam}`, '');
        navigate(`/projects/${project.slug}${remainder}`, { replace: true });
        return null;
    }

    if (!project) return <div>Loading...</div>;

    return (
        <Box sx={{ display: 'flex', height: '100%' }}>
            <ProjectSidebar
                project={project}
                menuItems={projectSidebarMenuItems}
            />
            <Routes>
                {projectRoutes.map(({ key, component }) => (
                    <Fragment key={key}>{renderElement(component)}</Fragment>
                ))}
            </Routes>
        </Box>
    );
};

export default Project;
