import { Stack } from '@mui/material';
import { FormField } from '@avyyx/admin-ui';
import { Control } from 'react-hook-form';
import { CreateUserFormData } from '../../../hooks/useCreateUserForm';
import { defineMessages, useIntl } from 'react-intl';
import { RoleSelectField } from '../../RoleSelectField';
import { ProjectsSelectField } from '../../ProjectsSelectField';

type CreateUserFormProps = {
    control: Control<CreateUserFormData>;
    disabled: boolean;
};

const intlMessages = defineMessages({
    fullname: {
        id: 'users.create.fullname',
        defaultMessage: 'Full Name'
    },
    email: {
        id: 'users.create.email',
        defaultMessage: 'Email'
    }
});

export const CreateUserForm = ({ control, disabled }: CreateUserFormProps) => {
    const { formatMessage } = useIntl();

    console.log(control._formValues)
    return (
        <Stack spacing={3}>
            <FormField
                control={control}
                name="fullname"
                inputProps={{
                    label: formatMessage(intlMessages.fullname),
                    labelPlacement: 'outside',
                    placeholder: 'John Doe',
                    disabled
                }}
            />
            <FormField
                control={control}
                name="email"
                inputProps={{
                    label: formatMessage(intlMessages.email),
                    labelPlacement: 'outside',
                    placeholder: 'john@doe.com',
                    disabled
                }}
            />
            <RoleSelectField control={control} selectProps={{ disabled }} />
            <ProjectsSelectField control={control} selectProps={{ disabled }} />
        </Stack>
    );
};
