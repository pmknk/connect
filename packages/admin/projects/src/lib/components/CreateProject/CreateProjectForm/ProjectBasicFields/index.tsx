import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import { Control } from 'react-hook-form';
import { FormField } from '@avyyx/admin-ui';
import Stack from '@mui/material/Stack';

import { type CreateProjectFormData } from '../../../../hooks/useCreateProjectForm';

type ProjectBasicFieldsProps = {
    control: Control<CreateProjectFormData>;
    isLoading: boolean;
};

const intlMessages = defineMessages({
    name: {
        id: 'projects.create.name',
        defaultMessage: 'Name'
    },
    slug: {
        id: 'projects.create.slug',
        defaultMessage: 'Slug'
    },
    description: {
        id: 'projects.create.description',
        defaultMessage: 'Description'
    },
    descriptionPlaceholder: {
        id: 'projects.create.description.placeholder',
        defaultMessage: 'My Project Description'
    },
    namePlaceholder: {
        id: 'projects.create.name.placeholder',
        defaultMessage: 'My Project'
    },
    slugPlaceholder: {
        id: 'projects.create.slug.placeholder',
        defaultMessage: 'my-project'
    }
});

export const ProjectBasicFields = ({
    control,
    isLoading
}: ProjectBasicFieldsProps) => {
    const { formatMessage } = useIntl();

    return (
        <Stack spacing={3}>
            <FormField
                control={control}
                name="name"
                inputProps={{
                    labelPlacement: 'outside',
                    label: formatMessage(intlMessages.name),
                    type: 'text',
                    placeholder: formatMessage(intlMessages.namePlaceholder),
                    disabled: isLoading
                }}
            />
            <FormField
                control={control}
                name="slug"
                inputProps={{
                    labelPlacement: 'outside',
                    label: formatMessage(intlMessages.slug),
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
                    label: formatMessage(intlMessages.description),
                    placeholder: formatMessage(
                        intlMessages.descriptionPlaceholder
                    ),
                    disabled: isLoading,
                    multiline: true,
                    rows: 4
                }}
            />
        </Stack>
    );
}; 