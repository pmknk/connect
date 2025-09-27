import { Button, Stack, useMediaQuery, useTheme } from '@mui/material';

import { PermissionAccess } from '@avyyx/admin-utils';
import { ExtendedTheme } from '@avyyx/admin-ui';

import { FormattedMessage } from 'react-intl';
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

export const CreateUser = ({ onSuccess }: CreateUserProps) => {
    const { breakpoints } = useTheme<ExtendedTheme>();
    const isMobile = useMediaQuery(breakpoints.down('sm'));
    const [open, setOpen] = useState(false);

    const { control, handleSubmit, reset } = useCreateUserForm();
    const { mutate: createUser, isPending } = useCreateUserMutation();

    useEffect(() => {
        if (open) {
            reset({
                fullname: '',
                email: '',
                roleId: '',
                projectIds: [],
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
                    <FormattedMessage
                        id="users.create.title"
                        defaultMessage="Invite User"
                    />
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
                            color="error"
                            onClick={handleClose}
                            disabled={isPending}
                        >
                            <FormattedMessage
                                id="users.create.cancel"
                                defaultMessage="Cancel"
                            />
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            loading={isPending}
                        >
                            <FormattedMessage
                                id="users.create.button"
                                defaultMessage="Invite"
                            />
                        </Button>
                    </Stack>
                }
                onSubmit={handleSubmit(handleCreateUser)}
            />
        </>
    );
};
