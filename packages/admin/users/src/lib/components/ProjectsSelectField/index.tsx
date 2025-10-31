import { useMemo, useState } from 'react';

import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { SelectProps } from '@mui/material';

import { FormSelect, SearchMenuItem, SelectedValue } from '@content/admin-ui';
import { Control } from 'react-hook-form';
import { defineMessages, useIntl } from 'react-intl';

import { useProjectsQuery } from '../../hooks/useProjectsQuery';

type ProjectsSelectFieldProps = {
    control: Control<any>;
    selectProps?: SelectProps;
};

const intlMessages = defineMessages({
    projects: {
        id: 'users.create.projects',
        defaultMessage: 'Projects'
    },
    projectsPlaceholder: {
        id: 'users.create.projectsPlaceholder',
        defaultMessage: 'Select a projects'
    },
    projectsSelected: {
        id: 'users.create.projects.selected',
        defaultMessage: '{count} Project selected'
    },
    projectsSelectedPlural: {
        id: 'users.create.projects.selected.plural',
        defaultMessage: '{count} Projects selected'
    },
    projectsDescription: {
        id: 'users.create.projects.description',
        defaultMessage:
            'Select one or more projects that this user should have access to. You can select multiple projects if the user needs access to more than one.'
    },
    noProjectsFound: {
        id: 'users.create.projects.empty',
        defaultMessage: 'No projects found'
    },
    searchProjects: {
        id: 'users.create.projects.search',
        defaultMessage: 'Search projects'
    }
});

export const ProjectsSelectField = ({
    control,
    selectProps = {}
}: ProjectsSelectFieldProps) => {
    const { formatMessage } = useIntl();
    const { data: projects } = useProjectsQuery();
    const [search, setSearch] = useState('');

    const filteredProjects = useMemo(() => {
        return projects?.filter((project) =>
            project.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [projects, search]);

    return (
        <Stack spacing={1}>
            <FormSelect
                control={control}
                name="projectIds"
                selectProps={{
                    label: formatMessage(intlMessages.projects),
                    labelPlacement: 'outside',
                    MenuProps: {
                        PaperProps: {
                            sx: {
                                maxHeight: '200px'
                            }
                        },
                        MenuListProps: {
                            autoFocusItem: false
                        }
                    },
                    multiple: true,
                    displayEmpty: true,
                    renderValue: (value: any) => {
                        return (
                            <SelectedValue
                                value={value}
                                messages={{
                                    placeholder: formatMessage(
                                        intlMessages.projectsPlaceholder
                                    ),
                                    single: (count: number) =>
                                        formatMessage(
                                            intlMessages.projectsSelected,
                                            { count }
                                        ),
                                    plural: (count: number) =>
                                        formatMessage(
                                            intlMessages.projectsSelectedPlural,
                                            { count }
                                        )
                                }}
                            />
                        );
                    },
                    helperText: formatMessage(intlMessages.projectsDescription),
                    disabled: selectProps.disabled
                }}
            >
                <SearchMenuItem
                    textFieldProps={{
                        placeholder: formatMessage(intlMessages.searchProjects),
                        onChange: (e) => {
                            setSearch(e.target.value);
                        },
                        value: search
                    }}
                />
                {(!filteredProjects || filteredProjects.length === 0) && (
                    <MenuItem disabled>
                        <Typography variant="body2" color="text.secondary">
                            {formatMessage(intlMessages.noProjectsFound)}
                        </Typography>
                    </MenuItem>
                )}
                {filteredProjects?.map((project) => (
                    <MenuItem value={project.id} key={project.id}>
                        <Stack
                            spacing={0.5}
                            direction="column"
                            sx={{ maxWidth: '340px' }}
                        >
                            <Typography variant="body2">
                                {project.name}
                            </Typography>
                            {project.description && (
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{
                                        wordBreak: 'break-word',
                                        whiteSpace: 'pre-line'
                                    }}
                                >
                                    {project.description}
                                </Typography>
                            )}
                        </Stack>
                    </MenuItem>
                ))}
            </FormSelect>
        </Stack>
    );
};
