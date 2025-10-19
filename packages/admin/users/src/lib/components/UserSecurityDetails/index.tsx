import Stack from '@mui/material/Stack';
import { defineMessages, useIntl } from 'react-intl';
import { FormField } from '@connect/admin-ui';

import { useUpdatePasswordForm } from '../../hooks/useUpdatePasswordForm';
import { Button } from '@mui/material';
import { UserPersonalDetailsDangerZone } from './UserPersonalDetailsDangerZone';

const intlMessages = defineMessages({
    password: {
        id: 'users.securityDetails.password',
        defaultMessage: 'Password'
    },
    confirmPassword: {
        id: 'users.securityDetails.confirmPassword',
        defaultMessage: 'Confirm Password'
    },
    updatePassword: {
        id: 'users.securityDetails.save',
        defaultMessage: 'Update password'
    },
    passwordDescription: {
        id: 'users.securityDetails.passwordDescription',
        defaultMessage:
            'Enter a password to complete your account setup. The password must be at least 8 characters long, and must contain at least one uppercase letter, one lowercase letter, and one number.'
    }
});

export const UserSecurityDetails = () => {
    const { formatMessage } = useIntl();
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useUpdatePasswordForm();

    return (
        <Stack spacing={6}>
            <form
                onSubmit={handleSubmit(async (formData) => {
                    console.log(formData);
                })}
            >
                <Stack spacing={3} sx={{ maxWidth: '400px' }}>
                    <FormField
                        control={control}
                        name="password"
                        inputProps={{
                            type: 'password',
                            label: formatMessage(intlMessages.password),
                            labelPlacement: 'outside',
                            placeholder: '••••••••',
                            helperText: formatMessage(
                                intlMessages.passwordDescription
                            )
                        }}
                    />
                    <FormField
                        control={control}
                        name="confirmPassword"
                        inputProps={{
                            type: 'password',
                            label: formatMessage(intlMessages.confirmPassword),
                            placeholder: '••••••••',
                            labelPlacement: 'outside'
                        }}
                    />
                    <Stack
                        spacing={2}
                        direction="row"
                        justifyContent="flex-end"
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            {formatMessage(intlMessages.updatePassword)}
                        </Button>
                    </Stack>
                </Stack>
            </form>
            <UserPersonalDetailsDangerZone />
        </Stack>
    );
};
