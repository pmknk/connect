import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import { FormSelect } from "@avyyx/admin-ui"
import { Control } from "react-hook-form"
import { defineMessages, useIntl } from "react-intl"

import { CreateUserFormData } from "../../hooks/useCreateUserForm"
import { useRolesQuery } from "../../hooks/useRolesQuery"
import Stack from "@mui/material/Stack";

type RoleSelectFieldProps = {
    control: Control<CreateUserFormData>
}

const intlMessages = defineMessages({
    role: {
        id: 'users.create.role',
        defaultMessage: 'Role'
    },
    rolePlaceholder: {
        id: 'users.create.rolePlaceholder',
        defaultMessage: 'Select a role'
    }
})

export const RoleSelectField = ({ control }: RoleSelectFieldProps) => {
    const { formatMessage } = useIntl()
    const { data: roles } = useRolesQuery();


    const renderSelectedValue = (value: any) => {
        const role = roles?.find((role) => role.id === value);
        return role?.name || (
            <Typography
                color={'text.primary'}
                sx={{
                    fontSize: '14px',
                    fontWeight: 400,
                    opacity: 0.4
                }}
            >
                {formatMessage(intlMessages.rolePlaceholder)}
            </Typography>
        )
    }

    return (
        <FormSelect
            control={control}
            name="roleId"
            selectProps={{ 
                label: formatMessage(intlMessages.role),
                labelPlacement: 'outside',
                MenuProps: {
                    PaperProps: {
                        sx: {
                            maxHeight: '200px'
                        }
                    }
                },
                displayEmpty: true,
                renderValue: renderSelectedValue
            }}
        >
            {roles?.map((role) => (
                <MenuItem value={role.id} key={role.id}>
                    <Stack spacing={0.5} direction="column" sx={{ maxWidth: '340px' }}>
                        <Typography variant="body2"

>
                            {role.name}
                        </Typography>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ wordBreak: 'break-word', whiteSpace: 'pre-line' }}
                        >
                            {role.description}
                        </Typography>
                    </Stack>
                </MenuItem>
            ))}
        </FormSelect>
    )
}