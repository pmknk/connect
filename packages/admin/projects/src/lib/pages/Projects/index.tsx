import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

import { ExtendedTheme } from '@content/admin-ui';

import { useMemo } from 'react';
import { useProjectsFilter } from '../../hooks/useProjectsFilter';
import { defineMessages, useIntl } from 'react-intl';

import { useProjectsQuery } from '../../hooks/useProjectsQuery';
import { NoProjectsFoundCta } from '../../components/NoProjectsFoundCta/index';
import {
    ProjectsGrid,
    ProjectGridSkeleton
} from '../../components/ProjectsGrid';
import { CreateProject } from '../../components/CreateProject';
import { ProjectsActivityFilter } from '../../components/ProjectsActivityFilter';

const Projects = () => {
    const { formatMessage } = useIntl();
    const intlMessages = defineMessages({
        title: {
            id: 'projects.title',
            defaultMessage: 'Projects'
        },
        description: {
            id: 'projects.description',
            defaultMessage: 'List of all projects you have access to'
        },
        emptyTitle: {
            id: 'projects.empty.title',
            defaultMessage: 'No projects found'
        },
        emptyFilteredDescription: {
            id: 'projects.empty.filtered.description',
            defaultMessage: 'No projects match your current search or filter'
        },
        emptyDescription: {
            id: 'projects.empty.description',
            defaultMessage:
                'Projects allow you to group your content, settings, and workflows. Create your first project to manage entries, media, and publishing.'
        }
    });
    const { breakpoints } = useTheme<ExtendedTheme>();
    const isMobile = useMediaQuery(breakpoints.down('sm'));

    const {
        data: projects,
        isLoading,
        refetch,
        isFetching
    } = useProjectsQuery();
    const hasProjects = projects && projects.length > 0;
    const { activityFilter, setActivityFilter, search, setSearch } =
        useProjectsFilter();

    const filteredProjects = useMemo(
        () =>
            projects?.filter((project) =>
                project.name.toLowerCase().includes(search.toLowerCase())
            ) || [],
        [projects, search]
    );

    const filteredProjectsByActivity = useMemo(
        () =>
            filteredProjects?.filter((project) => {
                if (activityFilter === 'all') {
                    return true;
                }

                if (activityFilter === 'active') {
                    return project.deletedAt === null;
                }

                return project.deletedAt !== null;
            }) || [],
        [filteredProjects, activityFilter]
    );

    return (
        <>
            <Container
                maxWidth="xl"
                sx={{
                    my: isMobile ? 3 : 4,
                    pb: isMobile ? 8 : 0,
                }}
            >
                <Stack direction="column" spacing={1}>
                    <Typography variant="h5">
                        {formatMessage(intlMessages.title)}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {formatMessage(intlMessages.description)}
                    </Typography>
                </Stack>
                {isLoading || isFetching ? (
                    <ProjectGridSkeleton />
                ) : hasProjects ? (
                    <Stack sx={{ mt: 4 }} gap={2}>
                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                                width="100%"
                            >
                                <TextField
                                    name="search"
                                    type="text"
                                    placeholder="Search"
                                    onChange={(e) => setSearch(e.target.value)}
                                    value={search}
                                    size="small"
                                    sx={{
                                        width: '100%',
                                        maxWidth: '320px'
                                    }}
                                />
                                <ProjectsActivityFilter
                                    value={activityFilter}
                                    onFilterChange={setActivityFilter}
                                />
                            </Stack>
                            {!isMobile && <CreateProject onSuccess={refetch} />}
                        </Stack>
                        {filteredProjectsByActivity.length > 0 ? (
                            <ProjectsGrid
                                projects={filteredProjectsByActivity}
                            />
                        ) : (
                            <NoProjectsFoundCta
                                onSuccess={refetch}
                                title={formatMessage(intlMessages.emptyTitle)}
                                description={formatMessage(intlMessages.emptyFilteredDescription)}
                                showCreateProject={false}
                            />
                        )}
                    </Stack>
                ) : (
                <NoProjectsFoundCta
                    onSuccess={refetch}
                    title={formatMessage(intlMessages.emptyTitle)}
                    description={formatMessage(intlMessages.emptyDescription)}
                />
                )}
            </Container>
            {isMobile && hasProjects && (
                <Stack
                    sx={{
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 1000,
                        p: 2,
                        backgroundColor: 'background.paper',
                        borderTop: '1px solid',
                        borderColor: 'divider'
                    }}
                >
                    <CreateProject onSuccess={refetch} />
                </Stack>
            )}
        </>
    );
};

export default Projects;
