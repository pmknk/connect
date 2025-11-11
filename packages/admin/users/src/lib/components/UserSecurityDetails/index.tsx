import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import { defineMessages, useIntl } from 'react-intl';
import { FormField } from '@content/admin-ui';
import { useSnackbar } from '@content/admin-utils';

import { useUpdatePasswordForm } from '../../hooks/useUpdatePasswordForm';
import { UserPersonalDetailsDangerZone } from './UserPersonalDetailsDangerZone';
import { UserQueryResponse } from '../../hooks/useUserQuery';
import { useUpdatePasswordMutation } from '../../hooks/useUpdatePasswordMutation';

type UserSecurityDetailsProps = {
    user: UserQueryResponse['data'];
};

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
    updatePasswordSuccess: {
        id: 'users.securityDetails.updatePasswordSuccess',
        defaultMessage: 'Password updated successfully.'
    },
    updatePasswordError: {
        id: 'users.securityDetails.updatePasswordError',
        defaultMessage: 'Failed to update password.'
    },
    passwordDescription: {
        id: 'users.securityDetails.passwordDescription',
        defaultMessage:
            'Enter a password to complete your account setup. The password must be at least 8 characters long, and must contain at least one uppercase letter, one lowercase letter, and one number.'
    }
});

export const UserSecurityDetails = ({ user }: UserSecurityDetailsProps) => {
    const { formatMessage } = useIntl();
    const { showSnackbar } = useSnackbar();
    const {
        control,
        handleSubmit,
        reset
    } = useUpdatePasswordForm();
    const { mutateAsync: updatePassword, isPending } = useUpdatePasswordMutation(
        () => {
            reset();
            showSnackbar({
                message: formatMessage(intlMessages.updatePasswordSuccess),
                severity: 'success'
            });
        },
        () => {
            showSnackbar({
                message: formatMessage(intlMessages.updatePasswordError),
                severity: 'error'
            });
        }
    );

    const isPendingInvitationAccepted = !!user.invite;
    const isDeactivated = !!user.deletedAt;
    const isActive = !isPendingInvitationAccepted && !isDeactivated;

    return (
        <Stack spacing={6}>
            <form
                onSubmit={handleSubmit(async (formData) => {
                    await updatePassword({ password: formData.password });
                })}
            >
                <Stack spacing={3} sx={{ maxWidth: '500px' }}>
                    <FormField
                        control={control}
                        name="password"
                        inputProps={{
                            disabled: !isActive || isPending,
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
                            disabled: !isActive || isPending,
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
                            disabled={!isActive || isPending}
                        >
                            {formatMessage(intlMessages.updatePassword)}
                        </Button>
                    </Stack>
                </Stack>
            </form>
            <Divider />
            <UserPersonalDetailsDangerZone
                userId={user.id}
                inviteId={user.invite?.id ?? ''}
                isPendingInvitationAccepted={isPendingInvitationAccepted}
                isDeactivated={isDeactivated}
                isActive={isActive}
            />
        </Stack>
    );
};
