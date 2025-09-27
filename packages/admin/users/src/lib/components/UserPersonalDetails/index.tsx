import {
    Alert,
    Avatar,
    Button,
    CircularProgress,
    Snackbar,
    Stack,
    useTheme
} from '@mui/material';
import { ExtendedTheme, FormField } from '@avyyx/admin-ui';
import { usePermissionAccess } from '@avyyx/admin-utils';

import { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import { useUserForm } from '../../hooks/useUserForm';
import { UserQueryResponse } from '../../hooks/useUserQuery';
import { useUpdateUserMutation } from '../../hooks/useUpdateUserMutation';

import { RoleSelectField } from '../RoleSelectField';
import { ProjectsSelectField } from '../ProjectsSelectField';
import { PendingInvitationAccept } from '../PendingInvitationAccept';

import { getInvitationUrl } from '../../utils';

const intlMessages = defineMessages({
    save: {
        id: 'users.personalDetails.save',
        defaultMessage: 'Save changes'
    },
    fullname: {
        id: 'users.personalDetails.fullname',
        defaultMessage: 'Full Name'
    },
    email: {
        id: 'users.personalDetails.email',
        defaultMessage: 'Email'
    },
    userId: {
        id: 'users.personalDetails.userId',
        defaultMessage: 'User ID'
    },
    updatedSuccessfully: {
        id: 'users.personalDetails.updatedSuccessfully',
        defaultMessage: 'User updated successfully'
    }
});

type UserPersonalDetailsProps = {
    user: UserQueryResponse['data'];
};

export const UserPersonalDetails = ({ user }: UserPersonalDetailsProps) => {
    const { palette } = useTheme<ExtendedTheme>();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const { control, handleSubmit } = useUserForm({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        roleId: user.roles[0].id,
        projectIds: user.projects.map((project) => project.id)
    });
    const { mutate: updateUser, isPending } = useUpdateUserMutation(() => {
        setOpenSnackbar(true);
    });

    const { formatMessage } = useIntl();

    const hasUpdatePermission = usePermissionAccess({
        permissions: [
            {
                action: 'update',
                resource: 'admin:user'
            }
        ]
    });
    return (
        <form
            onSubmit={handleSubmit(async (formData) => {
                updateUser(formData);
            })}
        >
            <Stack spacing={6}>
                {user.invite && (
                    <PendingInvitationAccept
                        invitationCode={user.invite.code}
                    />
                )}
                <Stack spacing={3} sx={{ maxWidth: '490px' }}>
                    <Stack spacing={6} direction="row">
                        <Avatar
                            variant="rounded"
                            sx={{
                                backgroundColor: palette.primary.main,
                                width: 100,
                                height: 100,
                                fontSize: 50,
                                borderRadius: 2
                            }}
                        >
                            {user.fullName.charAt(0)}
                        </Avatar>
                        <Stack spacing={3} width="100%">
                            <FormField
                                control={control}
                                name="fullName"
                                inputProps={{
                                    label: formatMessage(intlMessages.fullname),
                                    labelPlacement: 'outside',
                                    placeholder: 'John Doe',
                                    disabled: !hasUpdatePermission || isPending
                                }}
                            />
                            <FormField
                                control={control}
                                name="email"
                                inputProps={{
                                    label: formatMessage(intlMessages.email),
                                    labelPlacement: 'outside',
                                    placeholder: 'john@doe.com',
                                    disabled: !hasUpdatePermission || isPending
                                }}
                            />
                        </Stack>
                    </Stack>
                    <FormField
                        control={control}
                        name="id"
                        inputProps={{
                            label: formatMessage(intlMessages.userId),
                            labelPlacement: 'outside',
                            placeholder: 'User ID',
                            disabled: true
                        }}
                    />
                    <RoleSelectField
                        control={control}
                        selectProps={{
                            disabled: !hasUpdatePermission || isPending
                        }}
                    />
                    <ProjectsSelectField
                        control={control}
                        selectProps={{
                            disabled: !hasUpdatePermission || isPending
                        }}
                    />
                    <Stack
                        spacing={2}
                        direction="row"
                        justifyContent="flex-end"
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={!hasUpdatePermission}
                            type="submit"
                            loading={isPending}
                        >
                            {formatMessage(intlMessages.save)}
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
            <Snackbar
                open={openSnackbar}
                onClose={() => {
                    setOpenSnackbar(false);
                }}
                message={formatMessage(intlMessages.updatedSuccessfully)}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert severity="success">
                    {formatMessage(intlMessages.updatedSuccessfully)}
                </Alert>
            </Snackbar>
        </form>
    );
};
