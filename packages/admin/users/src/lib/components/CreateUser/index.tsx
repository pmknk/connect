import { Button, Stack, useMediaQuery, useTheme } from '@mui/material';

import { PermissionAccess, useSnackbar } from '@content/admin-utils';
import { ExtendedTheme } from '@content/admin-ui';

import { defineMessages, useIntl } from 'react-intl';
import { useEffect, useState } from 'react';
import { CreateUserDialog } from './CreateUserDialog';
import { CreateUserForm } from './CreateUserForm';
import {
    CreateUserFormData,
    useCreateUserForm
} from '../../hooks/useCreateUserForm';
import { useCreateUserMutation } from '../../hooks/useCreateUserMutation';

type CreateUserProps = {
    onSuccess?: () => void;
};

const intlMessages = defineMessages({
    title: {
        id: 'users.create.title',
        defaultMessage: 'Invite User'
    },
    invitationSent: {
        id: 'users.create.invitationSent',
        defaultMessage: 'Invitation has been created successfully'
    },
    cancel: {
        id: 'users.create.cancel',
        defaultMessage: 'Cancel'
    },
    button: {
        id: 'users.create.button',
        defaultMessage: 'Invite'
    }
});

export const CreateUser = ({ onSuccess }: CreateUserProps) => {
    const { breakpoints } = useTheme<ExtendedTheme>();
    const isMobile = useMediaQuery(breakpoints.down('sm'));
    const [open, setOpen] = useState(false);
    const { showSnackbar } = useSnackbar();
    const { formatMessage } = useIntl();
    const { control, handleSubmit, reset } = useCreateUserForm();
    const { mutate: createUser, isPending } = useCreateUserMutation(() => {
        showSnackbar({
            message: formatMessage(intlMessages.invitationSent),
            severity: 'success'
        });
    });

    useEffect(() => {
        if (open) {
            reset({
                fullname: '',
                email: '',
                roleId: '',
                projectIds: []
            });
        }
    }, [reset, open]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreateUser = (data: CreateUserFormData) => {
        createUser(data, {
            onSuccess: () => {
                handleClose();
                onSuccess?.();
            }
        });
    };

    return (
        <>
            <PermissionAccess
                permissions={[{ action: 'create', resource: 'admin:user' }]}
            >
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        width: isMobile ? '100%' : '120px'
                    }}
                    onClick={() => setOpen(true)}
                >
                    {formatMessage(intlMessages.title)}
                </Button>
            </PermissionAccess>
            <CreateUserDialog
                open={open}
                onClose={handleClose}
                content={
                    <CreateUserForm control={control} disabled={isPending} />
                }
                actions={
                    <Stack direction="row" spacing={1}>
                        <Button
                            variant="text"
                            onClick={handleClose}
                            disabled={isPending}
                        >
                            {formatMessage(intlMessages.cancel)}
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            loading={isPending}
                        >
                            {formatMessage(intlMessages.button)}
                        </Button>
                    </Stack>
                }
                onSubmit={handleSubmit(handleCreateUser)}
            />
        </>
    );
};
