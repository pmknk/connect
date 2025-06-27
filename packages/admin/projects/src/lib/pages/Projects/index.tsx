import { Button, Card, Typography } from '@material-tailwind/react';

import { FormattedMessage } from 'react-intl';
import { useProjectsQuery } from '../../hooks/useProjectsQuery';
import { NoProjectsFoundCta } from '../../components/NoProjectsFoundCta';

const ProjectCard = () => {
    return (
        <Card className="max-w-xs">
            <Card.Body>
                <Typography type="h6">UI/UX Review Check</Typography>
                <Typography className="my-1 text-foreground">
                    The place is close to Barceloneta Beach and bus stop just 2
                    min by walk and near to "Naviglio" where you can enjoy the
                    main night life in Barcelona.
                </Typography>
            </Card.Body>
        </Card>
    );
};

const Projects = () => {
    const { data: projects, isLoading, error } = useProjectsQuery();
    console.log(projects);

    const hasProjects = projects && projects.length > 0;

    return (
        <div className="max-w-6xl mx-auto w-full py-8 px-8 h-full">
            <Typography type="h5" className="font-normal">
                <FormattedMessage
                    id="projects.title"
                    defaultMessage="Projects"
                />
            </Typography>
            <Typography type="small" className="font-normal text-foreground">
                <FormattedMessage
                    id="projects.description"
                    defaultMessage="List of all projects you have access to"
                />
            </Typography>
            {hasProjects ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    projects
                </div>
            ) : (
                <NoProjectsFoundCta />
            )}
        </div>
    );
};

export default Projects;
