import { Stack, Typography } from '@mui/material';
import { defineMessages, useIntl } from 'react-intl';
import { ActionAlert } from './ActionAlert';

type UserPersonalDetailsDangerZoneProps = {
    isPendingInvitationAccepted: boolean;
    isDeactivated: boolean;
    isActive: boolean;
};

const intlMessages = defineMessages({
    dangerZone: {
        id: 'users.personalDetails.dangerZone',
        defaultMessage: 'Danger Zone'
    },
    deactivateAccount: {
        id: 'users.personalDetails.deactivateAccount',
        defaultMessage: 'Deactivate Account'
    },
    deactivateAccountDescription: {
        id: 'users.personalDetails.deactivateAccountDescription',
        defaultMessage:
            'Deactivating this account will block the user from logging in or using the platform. Data will not be deleted. You can reactivate the account later.'
    },
    cancelInvitation: {
        id: 'users.personalDetails.cancelInvitation',
        defaultMessage: 'Cancel Invitation'
    },
    cancelInvitationDescription: {
        id: 'users.personalDetails.cancelInvitationDescription',
        defaultMessage:
            'Cancelling this invitation will remove the user from the system. You can re-invite this user later if needed.'
    },
    activateAccount: {
        id: 'users.personalDetails.activateAccount',
        defaultMessage: 'Activate Account'
    },
    activateAccountDescription: {
        id: 'users.personalDetails.activateAccountDescription',
        defaultMessage:
            'Activating this account will allow the user to log in or use the platform. You can deactivate the account again later.'
    }
});

export const UserPersonalDetailsDangerZone = ({
    isPendingInvitationAccepted,
    isDeactivated,
    isActive
}: UserPersonalDetailsDangerZoneProps) => {
    const { formatMessage } = useIntl();
    return (
        <Stack spacing={3} sx={{ mt: 3 }}>
            <Typography variant="body1">
                {formatMessage(intlMessages.dangerZone)}
            </Typography>
            <Stack spacing={3}>
                {isDeactivated && (
                    <ActionAlert
                        severity="success"
                        title={formatMessage(intlMessages.activateAccount)}
                        description={formatMessage(
                            intlMessages.activateAccountDescription
                        )}
                        actionLabel={formatMessage(
                            intlMessages.activateAccount
                        )}
                        actionColor="success"
                    />
                )}
                {isPendingInvitationAccepted && (
                    <ActionAlert
                        severity="warning"
                        title={formatMessage(intlMessages.cancelInvitation)}
                        description={formatMessage(
                            intlMessages.cancelInvitationDescription
                        )}
                        actionLabel={formatMessage(
                            intlMessages.cancelInvitation
                        )}
                        actionColor="warning"
                    />
                )}
                {isActive && (
                    <ActionAlert
                        severity="error"
                        title={formatMessage(intlMessages.deactivateAccount)}
                        description={formatMessage(
                            intlMessages.deactivateAccountDescription
                        )}
                        actionLabel={formatMessage(
                            intlMessages.deactivateAccount
                        )}
                        actionColor="error"
                    />
                )}
            </Stack>
        </Stack>
    );
};
