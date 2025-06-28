import { FormField, FormTextarea } from '@avyyx/admin-ui';
import { FormattedMessage } from 'react-intl';
import { Control } from 'react-hook-form';
import { type CreateProjectFormData } from '../../../hooks/useCreateProjectForm';

type CreateProjectFormProps = {
    control: Control<CreateProjectFormData>;
    isLoading: boolean;
};

export const CreateProjectForm = ({
    control,
    isLoading
}: CreateProjectFormProps) => {
    return (
        <>
            <FormField
                control={control}
                name="name"
                label={
                    <FormattedMessage
                        id="projects.create.name"
                        defaultMessage="Name"
                    />
                }
                inputProps={{
                    type: 'text',
                    placeholder: 'My Project',
                    size: 'lg',
                    disabled: isLoading
                }}
            />
            <FormField
                control={control}
                name="slug"
                label={
                    <FormattedMessage
                        id="projects.create.slug"
                        defaultMessage="Slug"
                    />
                }
                inputProps={{
                    type: 'text',
                    placeholder: 'my-project',
                    size: 'lg',
                    disabled: isLoading
                }}
            />
            <FormTextarea
                control={control}
                name="description"
                label={
                    <FormattedMessage
                        id="projects.create.description"
                        defaultMessage="Description"
                    />
                }
                textareaProps={{
                    placeholder: 'My Project Description',
                    size: 'lg',
                    disabled: isLoading,
                    rows: 4
                }}
            />
        </>
    );
};
