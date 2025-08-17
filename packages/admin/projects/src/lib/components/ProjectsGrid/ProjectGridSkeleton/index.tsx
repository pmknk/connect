import Grid from "@mui/material/Grid";
import { ProjectCardSkeleton } from "../ProjectCardSkeleton";

type ProjectGridSkeletonProps = {
    count?: number;
};

export const ProjectGridSkeleton = ({ count = 4 }: ProjectGridSkeletonProps) => {
    return (
        <Grid container spacing={4} sx={{ mt: 2 }}>
            {Array.from({ length: count }).map((_, index) => (
                <Grid size={{
                    xs: 12,
                    md: 6,
                    lg: 4,
                }} key={index}>
                    <ProjectCardSkeleton />
                </Grid>
            ))}
        </Grid>
    );
}; 