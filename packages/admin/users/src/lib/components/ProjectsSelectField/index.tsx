import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { SelectProps } from '@mui/material';

import { FormCheckbox, FormSelect, SelectedValue } from '@avyyx/admin-ui';
import { Control, useWatch } from 'react-hook-form';
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
    },
    selectAllProjects: {
        id: 'users.create.projects.selectAllProjects',
        defaultMessage: 'Select All available projects'
    }
});

export const ProjectsSelectField = ({
    control,
    selectProps = {}
}: ProjectsSelectFieldProps) => {
    const { formatMessage } = useIntl();
    const { data: projects } = useProjectsQuery();
    const { assignAvailableProjects } = useWatch({ control });
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
                        }
                    },
                    multiple: true,
                    displayEmpty: true,
                    renderValue: (value: any) => {
                        return <SelectedValue
                            value={value}
                            messages={{
                                placeholder: formatMessage(intlMessages.projectsPlaceholder),
                                single: (count: number) => formatMessage(intlMessages.projectsSelected, { count }),
                                plural: (count: number) => formatMessage(intlMessages.projectsSelectedPlural, { count })
                            }}
                        />
                    },
                    helperText: formatMessage(intlMessages.projectsDescription),
                    disabled: selectProps.disabled || assignAvailableProjects
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
            <FormCheckbox
                control={control}
                name="assignAvailableProjects"
                checkboxProps={{
                    label: formatMessage(intlMessages.selectAllProjects),
                    disabled: selectProps.disabled
                }}
            />
        </Stack>
    );
};
