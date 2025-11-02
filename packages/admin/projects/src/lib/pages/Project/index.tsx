import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useMediaQuery, useTheme } from "@mui/material";

import { ExtendedTheme } from "@content/admin-ui";

import { useParams } from "react-router-dom";
import { Book, ChartArea, ImageIcon, Settings } from "lucide-react";

import { useProjectQuery } from "../../hooks/useProjectQuery";
import { ProjectSidebar } from "../../components/ProjectSidebar";

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

    if (!project) return <div>Loading...</div>;

    return (
        <Box sx={{ display: "flex", gap: 2, height: "100%" }}>
            <ProjectSidebar 
                project={project} 
                menuItems={MENU_ITEMS}
            />
            {/* <Paper
                elevation={0}
                sx={{
                    width: SIDEBAR_WIDTH,
                    flexShrink: 0,
                    p: 2,
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h6" sx={{ mb: 1 }}>
                    Project
                </Typography>
                <Divider sx={{ mb: 1 }} />
                <List dense>
                    <ListItemButton selected>
                        <ListItemText primary="Overview" secondary="Summary & stats" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText primary="Tasks" secondary="Active work items" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText primary="Members" secondary="Team & roles" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText primary="Settings" secondary="Project preferences" />
                    </ListItemButton>
                </List>
            </Paper> */}

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
