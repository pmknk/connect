import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { defineMessages, useIntl } from 'react-intl';

import { Stack, Typography } from '@mui/material';
import { useSnackbar } from '@content/admin-utils';
import { ConfirmDialog } from '@content/admin-ui';
import { useQueryClient } from '@tanstack/react-query';

import { UserPersonalDetailsDangerZoneActionAlert } from './UserPersonalDetailsDangerZoneActionAlert';
import {
    USER_ACTION_ACTIVATE,
    USER_ACTION_CANCEL_INVITATION,
    USER_ACTION_DEACTIVATE,
    USERS_ROUTE,
    type UserDangerAction
} from '../../../constants';
import { useCancelInviteMutation } from '../../../hooks/useCancelInviteMutation';
import { useDeleteUserMutation } from '../../../hooks/useDeleteUserMutation';
import { useRestoreUserMutation } from '../../../hooks/useRestoreUserMutation';

/**
 * Props for the UserPersonalDetailsDangerZone component.
 */
type UserPersonalDetailsDangerZoneProps = {
    /**
     * The ID of the user to delete.
     */
    userId: string;
    /**
     * The ID of the invite to cancel.
     */
    inviteId: string;
    /**
     * Whether the user's invitation is pending acceptance.
     */
    isPendingInvitationAccepted: boolean;
    /**
     * Whether the user is currently deactivated.
     */
    isDeactivated: boolean;
    /**
     * Whether the user is currently active.
     */
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
    activateAccountSuccess: {
        id: 'users.personalDetails.activateAccountSuccess',
        defaultMessage: 'The account has been activated successfully.'
    },
    deactivateAccountSuccess: {
        id: 'users.personalDetails.deactivateAccountSuccess',
        defaultMessage: 'The account has been deactivated successfully.'
    },
    cancelInvitationSuccess: {
        id: 'users.personalDetails.cancelInvitationSuccess',
        defaultMessage: 'The invitation has been cancelled successfully.'
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

/**
 * UserPersonalDetailsDangerZone displays critical account management actions for a user
 * (such as deactivate, activate, or cancel invitation) with appropriate confirmation dialogs.
 *
 * @param {UserPersonalDetailsDangerZoneProps} props - The display flags for actionable states.
 * @returns {JSX.Element} Component display of the danger zone and dialogs.
 */
export const UserPersonalDetailsDangerZone = ({
    userId,
    inviteId,
    isPendingInvitationAccepted,
    isDeactivated,
    isActive
}: UserPersonalDetailsDangerZoneProps) => {
    const { formatMessage } = useIntl();
    const [openDialog, setOpenDialog] = useState<UserDangerAction | null>(null);
    const { showSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const { mutate: cancelInvite, isPending: isCancelingInvite } =
        useCancelInviteMutation(() => {
            setOpenDialog(null);
            showSnackbar({
                message: formatMessage(intlMessages.cancelInvitationSuccess),
                severity: 'success'
            });
            navigate(USERS_ROUTE);
        });

    const { mutate: deleteUser, isPending: isDeletingUser } =
        useDeleteUserMutation(() => {
            setOpenDialog(null);
            showSnackbar({
                message: formatMessage(intlMessages.deactivateAccountSuccess),
                severity: 'success'
            });
        });

    const { mutate: restoreUser, isPending: isRestoringUser } =
        useRestoreUserMutation(() => {
            setOpenDialog(null);
            showSnackbar({
                message: formatMessage(intlMessages.activateAccountSuccess),
                severity: 'success'
            });
        });

    return (
        <Stack spacing={3} sx={{ mt: 3 }}>
            <Typography variant="body1">
                {formatMessage(intlMessages.dangerZone)}
            </Typography>
            <Stack spacing={3}>
                {/* Display activate option if user is deactivated */}
                {isDeactivated && (
                    <UserPersonalDetailsDangerZoneActionAlert
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
                {/* Display cancel invitation option if invitation is pending acceptance */}
                {isPendingInvitationAccepted && (
                    <UserPersonalDetailsDangerZoneActionAlert
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
                {/* Display deactivate option if user is active */}
                {isActive && (
                    <UserPersonalDetailsDangerZoneActionAlert
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
            {/* Confirm dialog for activating an account */}
            <ConfirmDialog
                open={openDialog === USER_ACTION_ACTIVATE}
                onClose={() => setOpenDialog(null)}
                title={formatMessage(intlMessages.activateAccount)}
                body={formatMessage(intlMessages.activateAccountConfirmBody)}
                actions={[
                    {
                        label: formatMessage(intlMessages.cancel),
                        onClick: () => setOpenDialog(null),
                        disabled: isRestoringUser
                    },
                    {
                        label: formatMessage(intlMessages.confirm),
                        onClick: () => restoreUser(userId),
                        color: 'success',
                        variant: 'contained',
                        autoFocus: true,
                        loading: isRestoringUser
                    }
                ]}
            />
            {/* Confirm dialog for canceling invitation */}
            <ConfirmDialog
                open={openDialog === USER_ACTION_CANCEL_INVITATION}
                onClose={() => setOpenDialog(null)}
                title={formatMessage(intlMessages.cancelInvitation)}
                body={formatMessage(intlMessages.cancelInvitationConfirmBody)}
                actions={[
                    {
                        label: formatMessage(intlMessages.cancel),
                        onClick: () => setOpenDialog(null),
                        disabled: isCancelingInvite
                    },
                    {
                        label: formatMessage(intlMessages.confirm),
                        onClick: () => cancelInvite(inviteId ?? ''),
                        color: 'warning',
                        variant: 'contained',
                        autoFocus: true,
                        loading: isCancelingInvite
                    }
                ]}
            />
            {/* Confirm dialog for deactivating an account */}
            <ConfirmDialog
                open={openDialog === USER_ACTION_DEACTIVATE}
                onClose={() => setOpenDialog(null)}
                title={formatMessage(intlMessages.deactivateAccount)}
                body={formatMessage(intlMessages.deactivateAccountConfirmBody)}
                actions={[
                    {
                        label: formatMessage(intlMessages.cancel),
                        onClick: () => setOpenDialog(null),
                        disabled: isDeletingUser
                    },
                    {
                        label: formatMessage(intlMessages.confirm),
                        onClick: () => deleteUser(userId),
                        color: 'error',
                        variant: 'contained',
                        autoFocus: true,
                        loading: isDeletingUser
                    }
                ]}
            />
        </Stack>
    );
};
