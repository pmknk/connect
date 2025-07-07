import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { FormattedMessage } from 'react-intl';

import { useProjectsQuery } from '../../hooks/useProjectsQuery';
import { NoProjectsFoundCta } from '../../components/NoProjectsFoundCta/index';

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
            {hasProjects ? <div>projects</div> : <NoProjectsFoundCta />}
        </Container>
    );
};

export default Projects;
