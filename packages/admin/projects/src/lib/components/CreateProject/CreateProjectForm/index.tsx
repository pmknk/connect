
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import { Control } from 'react-hook-form';

import { ExtendedTheme, FormField, FormSelect } from '@avyyx/admin-ui';
import Stack from '@mui/material/Stack';

import { type CreateProjectFormData } from '../../../hooks/useCreateProjectForm';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

type CreateProjectFormProps = {
    control: Control<CreateProjectFormData>;
    isLoading: boolean;
};

const intlMessages = defineMessages({
    name: {
        id: 'projects.create.name',
        defaultMessage: 'Name',
    },
    slug: {
        id: 'projects.create.slug',
        defaultMessage: 'Slug',
    },
    slugDescription: {
        id: 'projects.create.slug.description',
        defaultMessage: 'A unique identifier for your project that will be used in URLs and API requests. This cannot be changed once the project is created.',
    },
    description: {
        id: 'projects.create.description',
        defaultMessage: 'Description',
    },
    users: {
        id: 'projects.create.users',
        defaultMessage: 'Users',
    },
    usersDescription: {
        id: 'projects.create.users.description',
        defaultMessage: 'Select the users who will be able to access this project.',
    },
    descriptionPlaceholder: {
        id: 'projects.create.description.placeholder',
        defaultMessage: 'My Project Description',
    },
    namePlaceholder: {
        id: 'projects.create.name.placeholder',
        defaultMessage: 'My Project',
    },
    slugPlaceholder: {
        id: 'projects.create.slug.placeholder',
        defaultMessage: 'my-project',
    },
    usersPlaceholder: {
        id: 'projects.create.users.placeholder',
        defaultMessage: 'Select Users',
    },
    usersHelperText: {
        id: 'projects.create.users.helperText',
    }
})

export const CreateProjectForm = ({
    control,
    isLoading
}: CreateProjectFormProps) => {
    const { formatMessage } = useIntl();
    const { palette } = useTheme<ExtendedTheme>()
    
    return (
        <Stack spacing={3}>
            <FormField
                control={control}
                name="name"
                inputProps={{
                    labelPlacement: 'outside',
                    label: (
                        formatMessage(intlMessages.name)
                    ),
                    type: 'text',
                    placeholder: formatMessage(intlMessages.namePlaceholder),
                    disabled: isLoading,
                }}
            />
            <FormField
                control={control}
                name="slug"
                inputProps={{
                    labelPlacement: 'outside',
                    label: (
                        formatMessage(intlMessages.slug)
                    ),
                    type: 'text',
                    placeholder: formatMessage(intlMessages.slugPlaceholder),
                    disabled: isLoading,
                    helperText: (
                        <FormattedMessage
                            id="projects.create.slug.description"
                            defaultMessage="A unique identifier for your project that will be used in URLs and API requests. This cannot be changed once the project is created."
                        />
                    )
                }}
            />
            <FormField
                control={control}
                name="description"
                inputProps={{
                    labelPlacement: 'outside',
                    label: (
                        formatMessage(intlMessages.description)
                    ),
                    placeholder: formatMessage(intlMessages.descriptionPlaceholder),
                    disabled: isLoading,
                    multiline: true,
                    rows: 4,
                }}
            />
            <FormSelect
                control={control}
                name="iconName"
                selectProps={{
                    labelPlacement: 'outside',
                    label: (
                        formatMessage(intlMessages.users)
                    ),
                    helperText: (
                        formatMessage(intlMessages.usersDescription)
                    ),
                    displayEmpty: true,
                    renderValue: (value) => {
                        if (!value) {
                            return (
                                <Typography color={'text.primary'} sx={{
                                    fontSize: '14px',
                                    fontWeight: 400,
                                    opacity: 0.4,
                                }}>
                                    {formatMessage(intlMessages.usersPlaceholder)}
                                </Typography>
                            )
                        }

                        return 'abc'
                    }
                }}
            >
                <MenuItem value="john-doe">John Doe</MenuItem>
                <MenuItem value="jane-doe">Jane Doe</MenuItem>
                <MenuItem value="jim-doe">Jim Doe</MenuItem>
            </FormSelect>
        </Stack>
    );
};
