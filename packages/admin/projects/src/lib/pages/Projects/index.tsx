import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { FormattedMessage } from 'react-intl';

import { useProjectsQuery } from '../../hooks/useProjectsQuery';
import { NoProjectsFoundCta } from '../../components/NoProjectsFoundCta/index';
import { ProjectsGrid, ProjectGridSkeleton } from '../../components/ProjectsGrid';
import { CreateProject } from '../../components/CreateProject';
import { useMemo, useState } from 'react';

const Projects = () => {
    const { data: projects, isLoading, refetch, isFetching } = useProjectsQuery();
    const hasProjects = projects && projects.length > 0;

    const [search, setSearch] = useState('');

    const filteredProjects = useMemo(
        () => projects?.filter((project) => project.name.toLowerCase().includes(search.toLowerCase())) || [],
        [projects, search]
    );

    return (
        <Container
            maxWidth="lg"
            sx={{
                py: 6,
                height: '100%'
            }}
        >
            <Stack direction="column" spacing={1}>
                <Typography variant="h5">
                    <FormattedMessage
                        id="projects.title"
                        defaultMessage="Projects"
                    />
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    <FormattedMessage
                        id="projects.description"
                        defaultMessage="List of all projects you have access to"
                    />
                </Typography>
            </Stack>
            {isLoading || isFetching ? (
                <ProjectGridSkeleton />
            ) : hasProjects ? (
                <Stack sx={{ mt: 4 }} gap={2}>
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                        <TextField
                            name="search"
                            type="text"
                            placeholder="Search"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            size="small"
                        />
                        <CreateProject onSuccess={refetch} />
                    </Stack>
                    <ProjectsGrid projects={filteredProjects} />
                </Stack>
            ) : (
                <NoProjectsFoundCta onSuccess={refetch} />
            )}
        </Container>
    );
};

export default Projects;
