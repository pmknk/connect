import { Avatar, Button, Stack, useTheme } from "@mui/material";
import { ExtendedTheme, FormField } from "@avyyx/admin-ui";
import { usePermissionAccess } from "@avyyx/admin-utils";

import { defineMessages, useIntl } from "react-intl";

import { useUserForm } from "../../hooks/userForm";
import { UserQueryResponse } from "../../hooks/useUserQuery";

import { RoleSelectField } from "../RoleSelectField";
import { ProjectsSelectField } from "../ProjectsSelectField";
import { PendingInvitationAccept } from "../PendingInvitationAccept";

import { getInvitationUrl } from "../../utils";

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
})

type UserPersonalDetailsProps = {
    user: UserQueryResponse['data'];
}

export const UserPersonalDetails = ({ user }: UserPersonalDetailsProps) => {
    const { palette } = useTheme<ExtendedTheme>();
    const { control } = useUserForm({
        id: user.id,
        fullname: user.fullName,
        email: user.email,
        roleId: user.roles[0].id,
        projectIds: user.projects.map((project) => project.id)
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
    const hasDeletePermission = usePermissionAccess({
        permissions: [
            {
                action: 'delete',
                resource: 'admin:user'
            }
        ]
    });

    return (
        <Stack spacing={6}>
            {user.invite && <PendingInvitationAccept 
                invitationUrl={getInvitationUrl(user.invite.code)}
            />}
            <Stack spacing={3} sx={{ maxWidth: '490px' }}>
                <Stack spacing={6} direction="row">
                    <Avatar variant="rounded" sx={{
                        backgroundColor: palette.primary.main,
                        width: 100,
                        height: 100,
                        fontSize: 50,
                        borderRadius: 2,
                    }}>
                        {user.fullName.charAt(0)}
                    </Avatar>
                    <Stack spacing={3} width="100%">
                        <FormField control={control} name="fullname" inputProps={{
                            label: formatMessage(intlMessages.fullname),
                            labelPlacement: 'outside',
                            placeholder: 'John Doe',
                            disabled: !hasUpdatePermission
                        }} />
                        <FormField control={control} name="email" inputProps={{
                            label: formatMessage(intlMessages.email),
                            labelPlacement: 'outside',
                            placeholder: 'john@doe.com',
                            disabled: !hasUpdatePermission
                        }} />
                    </Stack>
                </Stack>
                <FormField control={control} name="id" inputProps={{
                    label: formatMessage(intlMessages.userId),
                    labelPlacement: 'outside',
                    placeholder: 'User ID',
                    disabled: true,
                }} />
                <RoleSelectField control={control} selectProps={{ disabled: !hasUpdatePermission }} />
                <ProjectsSelectField control={control} selectProps={{ disabled: !hasUpdatePermission }} />
                <Stack spacing={2} direction="row" justifyContent="flex-end">
                    <Button variant="contained" color="primary" disabled={!hasUpdatePermission}>
                        {formatMessage(intlMessages.save)}
                    </Button>
                </Stack>
                {/* {hasDeletePermission && <UserPersonalDetailsDangerZone />} */}
            </Stack>
        </Stack>
    )
}