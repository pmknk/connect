import { Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { ConfirmDialog } from '@connect/admin-ui';
import { defineMessages, useIntl } from 'react-intl';
import { ActionAlert } from './ActionAlert';
import {
    USER_ACTION_ACTIVATE,
    USER_ACTION_CANCEL_INVITATION,
    USER_ACTION_DEACTIVATE,
    type UserDangerAction
} from '../../../constants';

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
    cancelInvitationConfirmBody: {
        id: 'users.personalDetails.cancelInvitationConfirmBody',
        defaultMessage:
            'Are you sure you want to cancel this invitation? You can re-invite this user later if needed.'
    },
    activateAccount: {
        id: 'users.personalDetails.activateAccount',
        defaultMessage: 'Activate Account'
    },
    activateAccountDescription: {
        id: 'users.personalDetails.activateAccountDescription',
        defaultMessage:
            'Activating this account will allow the user to log in or use the platform. You can deactivate the account again later.'
    },
    activateAccountConfirmBody: {
        id: 'users.personalDetails.activateAccountConfirmBody',
        defaultMessage:
            'Are you sure you want to activate this account? The user will be able to log in again.'
    },
    deactivateAccountConfirmBody: {
        id: 'users.personalDetails.deactivateAccountConfirmBody',
        defaultMessage:
            'Are you sure you want to deactivate this account? The user will be blocked from logging in. You can reactivate later.'
    },
    confirm: {
        id: 'common.confirm',
        defaultMessage: 'Confirm'
    },
    cancel: {
        id: 'common.cancel',
        defaultMessage: 'Cancel'
    }
});

export const UserPersonalDetailsDangerZone = ({
    isPendingInvitationAccepted,
    isDeactivated,
    isActive
}: UserPersonalDetailsDangerZoneProps) => {
    const { formatMessage } = useIntl();
    const [openDialog, setOpenDialog] = useState<UserDangerAction | null>(null);
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
                        onAction={() => setOpenDialog(USER_ACTION_ACTIVATE)}
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
                        onAction={() =>
                            setOpenDialog(USER_ACTION_CANCEL_INVITATION)
                        }
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
                        onAction={() => setOpenDialog(USER_ACTION_DEACTIVATE)}
                    />
                )}
            </Stack>
            <ConfirmDialog
                open={openDialog === USER_ACTION_ACTIVATE}
                onClose={() => setOpenDialog(null)}
                title={formatMessage(intlMessages.activateAccount)}
                body={formatMessage(intlMessages.activateAccountConfirmBody)}
                actions={[
                    {
                        label: formatMessage(intlMessages.cancel),
                        onClick: () => setOpenDialog(null)
                    },
                    {
                        label: formatMessage(intlMessages.confirm),
                        onClick: () => setOpenDialog(null),
                        color: 'success',
                        variant: 'contained',
                        autoFocus: true
                    }
                ]}
            />
            <ConfirmDialog
                open={openDialog === USER_ACTION_CANCEL_INVITATION}
                onClose={() => setOpenDialog(null)}
                title={formatMessage(intlMessages.cancelInvitation)}
                body={formatMessage(intlMessages.cancelInvitationConfirmBody)}
                actions={[
                    {
                        label: formatMessage(intlMessages.cancel),
                        onClick: () => setOpenDialog(null)
                    },
                    {
                        label: formatMessage(intlMessages.confirm),
                        onClick: () => setOpenDialog(null),
                        color: 'warning',
                        variant: 'contained',
                        autoFocus: true
                    }
                ]}
            />
            <ConfirmDialog
                open={openDialog === USER_ACTION_DEACTIVATE}
                onClose={() => setOpenDialog(null)}
                title={formatMessage(intlMessages.deactivateAccount)}
                body={formatMessage(
                    intlMessages.deactivateAccountConfirmBody
                )}
                actions={[
                    {
                        label: formatMessage(intlMessages.cancel),
                        onClick: () => setOpenDialog(null)
                    },
                    {
                        label: formatMessage(intlMessages.confirm),
                        onClick: () => setOpenDialog(null),
                        color: 'error',
                        variant: 'contained',
                        autoFocus: true
                    }
                ]}
            />
        </Stack>
    );
};
