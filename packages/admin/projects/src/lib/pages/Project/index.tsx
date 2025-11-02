import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useMediaQuery, useTheme } from "@mui/material";

import { ExtendedTheme } from "@content/admin-ui";
import { usePlugins } from "@content/admin-utils";

import { useParams } from "react-router-dom";
import { Book, ChartArea, ImageIcon, Settings } from "lucide-react";

import { useProjectQuery } from "../../hooks/useProjectQuery";
import { ProjectSidebar } from "../../components/ProjectSidebar";
import { PROJECTS_SLOTS } from "../../constants";

const MENU_ITEMS = [
    {
        label: "Insights",
        href: "/projects/:projectId",
        icon: <ChartArea />
    },
    {
        label: 'Content Library',
        href: "/projects/:projectId/content-library",
        icon: <Book />
    },
    {
        label: 'Media Library',
        href: "/projects/:projectId/media-library",
        icon: <ImageIcon />
    },
    {
        label: 'Settings',
        href: "/projects/:projectId/settings",
        icon: <Settings />
    }
];

const Project = () => {
    const { projectId } = useParams();
    const { data: project, isLoading } = useProjectQuery(projectId);
    const { breakpoints } = useTheme<ExtendedTheme>();
    const isMobile = useMediaQuery(breakpoints.down('sm'));


    const { getComponentsBySlot } = usePlugins();

    const projectSidebarMenuItems = getComponentsBySlot(PROJECTS_SLOTS.PROJECTS_SIDEBAR_MENU_ITEMS);

    console.log(projectSidebarMenuItems);

    if (!project) return <div>Loading...</div>;

    return (
        <Box sx={{ display: "flex", gap: 2, height: "100%" }}>
            <ProjectSidebar 
                project={project} 
                menuItems={projectSidebarMenuItems ?? []}
            />

            <Container 
                maxWidth={false}
                sx={{
                    flex: 1,
                    my: isMobile ? 3 : 4,
                    pb: isMobile ? 8 : 0,
                }}
            >
                <Stack spacing={2}>
                    <Typography variant="h4">
                        {isLoading ? "Loading…" : project?.name ?? "Project"}
                    </Typography>
                    {!isLoading && (
                        <Typography variant="body2" color="text.secondary">
                            ID: {project?.id}
                        </Typography>
                    )}
                </Stack>
            </Container>
        </Box>
    );
};

export default Project;
