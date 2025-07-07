import { Control } from 'react-hook-form';
import Stack from '@mui/material/Stack';

import { type CreateProjectFormData } from '../../../hooks/useCreateProjectForm';
import { ProjectBasicFields } from './ProjectBasicFields';
import { UserSelectionField } from './UserSelectionField';

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
            <ProjectBasicFields control={control} isLoading={isLoading} />
            <UserSelectionField control={control} isLoading={isLoading} />
        </Stack>
    );
};
