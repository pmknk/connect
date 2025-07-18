import Grid from "@mui/material/Grid";

import type { ProjectsQueryResponse } from "../../hooks/useProjectsQuery";
import { ProjectCard } from "./ProjectCard";

type ProjectsGridProps = {
    projects: ProjectsQueryResponse['data'];
};

export const ProjectsGrid = ({ projects }: ProjectsGridProps) => {
    return (
        <Grid container spacing={4} sx={{ mt: 2 }}>
            {projects.map((project) => (
                <Grid size={{
                    xs: 12,
                    md: 6,
                }} key={project.id}>
                    <ProjectCard project={project} />
                </Grid>
            ))}
        </Grid>
    );
};

export { ProjectGridSkeleton } from "./ProjectGridSkeleton";