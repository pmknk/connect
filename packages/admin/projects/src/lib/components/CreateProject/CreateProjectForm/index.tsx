
import { FormattedMessage } from 'react-intl';
import { Control } from 'react-hook-form';

import { FormField, FormSelect } from '@avyyx/admin-ui';
import Stack from '@mui/material/Stack';

import { type CreateProjectFormData } from '../../../hooks/useCreateProjectForm';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type CreateProjectFormProps = {
    control: Control<CreateProjectFormData>;
    isLoading: boolean;
};

export const CreateProjectForm = ({
    control,
    isLoading
}: CreateProjectFormProps) => {
    return (
        <Stack spacing={3}>
            <FormField
                control={control}
                name="name"
                inputProps={{
                    labelPlacement: 'outside',
                    label: (
                        <FormattedMessage
                            id="projects.create.name"
                            defaultMessage="Name"
                        />
                    ),
                    type: 'text',
                    placeholder: 'My Project',
                    disabled: isLoading,
                }}
            />
            <FormField
                control={control}
                name="slug"
                inputProps={{
                    labelPlacement: 'outside',
                    label: (
                        <FormattedMessage
                            id="projects.create.slug"
                            defaultMessage="Slug"
                        />
                    ),
                    type: 'text',
                    placeholder: 'my-project',
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
                        <FormattedMessage
                            id="projects.create.description"
                            defaultMessage="Description"
                        />
                    ),
                    placeholder: 'My Project Description',
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
                        <FormattedMessage
                            id="projects.create.users"
                            defaultMessage="Users"
                        />
                    ),
                    helperText: (
                        <FormattedMessage
                            id="projects.create.users.description"
                            defaultMessage="Select the users who will be able to access this project."
                        />
                    ),
                }}
                options={[
                    {
                        label: 'John Doe',
                        value: 'john-doe',
                    },
                    {
                        label: 'Jane Doe',
                        value: 'jane-doe',
                    },
                    {
                        label: 'Jim Doe',
                        value: 'jim-doe',
                    },
                ]}
            />
        </Stack>
    );
};
