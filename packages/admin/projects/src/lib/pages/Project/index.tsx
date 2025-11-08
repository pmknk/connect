import Box from '@mui/material/Box';

import { renderElement, usePlugins } from '@content/admin-utils';

import { Fragment } from 'react';
import { Routes, useParams } from 'react-router-dom';

import { useProjectQuery } from '../../hooks/useProjectQuery';
import { ProjectSidebar } from '../../components/ProjectSidebar';
import { PROJECTS_SLOTS } from '../../constants';
import { useRedirectToFirstProjectRoute } from '../../hooks/useRedirectToFirstProjectRoute';

const Project = () => {
    const { projectId } = useParams();
    const { data: project } = useProjectQuery(projectId);

    const { getComponentsBySlot } = usePlugins();

    const projectSidebarMenuItems =
        getComponentsBySlot(PROJECTS_SLOTS.PROJECT_SIDEBAR_MENU_ITEMS) ?? [];
    const projectRoutes =
        getComponentsBySlot(PROJECTS_SLOTS.PROJECT_ROUTES) ?? [];

    useRedirectToFirstProjectRoute({ projectId, projectRoutes });

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
