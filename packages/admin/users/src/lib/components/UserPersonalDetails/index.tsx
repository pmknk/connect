import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material';
import { ExtendedTheme, FormField } from '@content/admin-ui';
import { usePermissionAccess, useSnackbar } from '@content/admin-utils';

import { defineMessages, useIntl } from 'react-intl';

import { useUserForm } from '../../hooks/useUserForm';
import { UserQueryResponse } from '../../hooks/useUserQuery';
import { useUpdateUserMutation } from '../../hooks/useUpdateUserMutation';

import { RoleSelectField } from '../RoleSelectField';
import { ProjectsSelectField } from '../ProjectsSelectField';
import { PendingInvitationAccept } from './PendingInvitationAccept';

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
        defaultMessage: 'The user details have been updated successfully. All changes are now saved.'
    }
});

type UserPersonalDetailsProps = {
    user: UserQueryResponse['data'];
};

export const UserPersonalDetails = ({ user }: UserPersonalDetailsProps) => {
    const { palette } = useTheme<ExtendedTheme>();
    const { showSnackbar } = useSnackbar();
    const { control, handleSubmit } = useUserForm({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        roleId: user.roles[0].id,
        projectIds: user.projects.map((project) => project.id)
    });
    const { mutate: updateUser, isPending } = useUpdateUserMutation(() => {
        showSnackbar({ message: formatMessage(intlMessages.updatedSuccessfully), severity: 'success' });
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
                <Stack spacing={3} sx={{ maxWidth: '500px' }}>
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
        </form>
    );
};
