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
        <Container maxWidth="lg" sx={{
            py: 6,
            height: '100%',
        }}>
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
            {hasProjects ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    projects
                </div>
            ) : (
                <NoProjectsFoundCta />
            )}
        </Container>
    )

    // return (
    //     <div className="max-w-6xl mx-auto w-full py-8 px-8 h-full">
    //         <Typography type="h5" className="font-normal">
                // <FormattedMessage
                //     id="projects.title"
                //     defaultMessage="Projects"
                // />
    //         </Typography>
    //         <Typography type="small" className="font-normal text-foreground">
                // <FormattedMessage
                //     id="projects.description"
                //     defaultMessage="List of all projects you have access to"
                // />
    //         </Typography>
    //         {hasProjects ? (
    //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
    //                 projects
    //             </div>
    //         ) : (
    //             <NoProjectsFoundCta />
    //         )}
    //     </div>
    // );
};

export default Projects;
