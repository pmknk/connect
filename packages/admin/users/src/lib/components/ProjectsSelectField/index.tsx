import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { SelectProps } from '@mui/material';

import { FormSelect } from '@avyyx/admin-ui';
import { Control } from 'react-hook-form';
import { defineMessages, useIntl } from 'react-intl';

import { CreateUserFormData } from '../../hooks/useCreateUserForm';
import { useProjectsQuery } from '../../hooks/useProjectsQuery';

type ProjectsSelectFieldProps = {
    control: Control<CreateUserFormData>;
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
    }
});

export const ProjectsSelectField = ({
    control,
    selectProps = {}
}: ProjectsSelectFieldProps) => {
    const { formatMessage } = useIntl();
    const { data: projects } = useProjectsQuery();

    const renderSelectedValue = (value: any) => {
        if (!value || (Array.isArray(value) && value.length === 0)) {
            return (
                <Typography
                    color={'text.primary'}
                    sx={{
                        fontSize: '14px',
                        fontWeight: 400,
                        opacity: 0.4
                    }}
                >
                    {formatMessage(intlMessages.projectsPlaceholder)}
                </Typography>
            );
        }

        if (Array.isArray(value)) {
            const selectedProjects = projects?.filter((project) =>
                value.includes(project.id)
            );
            const count = selectedProjects?.length || 0;

            if (count === 0) {
                return '';
            } else if (count === 1) {
                return formatMessage(intlMessages.projectsSelected, {
                    count: 1
                });
            } else {
                return formatMessage(intlMessages.projectsSelectedPlural, {
                    count
                });
            }
        }

        return '';
    };

    return (
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
                    }
                },
                multiple: true,
                displayEmpty: true,
                renderValue: renderSelectedValue,
                helperText: formatMessage(intlMessages.projectsDescription),
                ...selectProps
            }}
        >
            {(!projects || projects.length === 0) && (
                <MenuItem disabled>
                    <Typography variant="body2" color="text.secondary">
                        {formatMessage(intlMessages.noProjectsFound)}
                    </Typography>
                </MenuItem>
            )}
            {projects?.map((project) => (
                <MenuItem value={project.id} key={project.id}>
                    <Stack
                        spacing={0.5}
                        direction="column"
                        sx={{ maxWidth: '340px' }}
                    >
                        <Typography variant="body2">{project.name}</Typography>
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
    );
};
