import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { FormattedMessage } from 'react-intl';

import { useProjectsQuery } from '../../hooks/useProjectsQuery';
import { NoProjectsFoundCta } from '../../components/NoProjectsFoundCta/index';
import { ProjectsGrid, ProjectGridSkeleton } from '../../components/ProjectsGrid';
import { CreateProject } from '../../components/CreateProject';

const Projects = () => {
    const { data: projects, isLoading, error } = useProjectsQuery();
    const hasProjects = projects && projects.length > 0;

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
            {isLoading ? (
                <ProjectGridSkeleton />
            ) : hasProjects ? (
                <Stack sx={{ mt: 4 }}>
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                        <TextField
                            name="search"
                            type="text"
                            placeholder="Search"
                            onChange={() => {}}
                            value=""
                            size="small"
                        />
                        <CreateProject />
                    </Stack>
                    <ProjectsGrid projects={projects} />
                </Stack>
            ) : (
                <NoProjectsFoundCta />
            )}
        </Container>
    );
};

export default Projects;
