import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useMediaQuery, useTheme } from "@mui/material";

import { ExtendedTheme } from "@content/admin-ui";
import { renderElement, usePlugins } from "@content/admin-utils";

import { Fragment } from "react";
import { Routes, useParams } from "react-router-dom";

import { useProjectQuery } from "../../hooks/useProjectQuery";
import { ProjectSidebar } from "../../components/ProjectSidebar";
import { PROJECTS_SLOTS } from "../../constants";
import { useRedirectToFirstProjectRoute } from "../../hooks/useRedirectToFirstProjectRoute";


const Project = () => {
    const { projectId } = useParams();
    const { data: project } = useProjectQuery(projectId);
    const { breakpoints } = useTheme<ExtendedTheme>();
    const isMobile = useMediaQuery(breakpoints.down('sm'));


    const { getComponentsBySlot } = usePlugins();

    const projectSidebarMenuItems = getComponentsBySlot(PROJECTS_SLOTS.PROJECT_SIDEBAR_MENU_ITEMS) ?? [];
    const projectRoutes = getComponentsBySlot(PROJECTS_SLOTS.PROJECT_ROUTES) ?? [];

    useRedirectToFirstProjectRoute({ projectId, projectRoutes });

    if (!project) return <div>Loading...</div>;

    return (
        <Box sx={{ display: "flex", gap: 2, height: "100%" }}>
            <ProjectSidebar 
                project={project} 
                menuItems={projectSidebarMenuItems}
            />

            <Container 
                maxWidth={false}
                sx={{
                    flex: 1,
                    my: isMobile ? 3 : 4,
                    pb: isMobile ? 8 : 0,
                }}
            >
                <Routes>
                    {projectRoutes.map(({ key, component }) => (
                        <Fragment key={key}>
                            {renderElement(component)}
                        </Fragment>
                    ))}
                </Routes>
            </Container>
        </Box>
    );
};

export default Project;
