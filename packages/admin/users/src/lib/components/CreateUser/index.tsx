import { Button, Stack, useMediaQuery, useTheme } from "@mui/material";

import { PermissionAccess } from "@avyyx/admin-utils";
import { ExtendedTheme } from "@avyyx/admin-ui";

import { FormattedMessage } from "react-intl";
import { useState } from "react";
import { CreateUserDialog } from "./CreateUserDialog";
import { CreateUserForm } from "./CreateUserForm";
import { useCreateUserForm } from "../../hooks/useCreateUserForm";

export const CreateUser = () => {
    const { breakpoints } = useTheme<ExtendedTheme>();
    const isMobile = useMediaQuery(breakpoints.down('sm'));
    const [open, setOpen] = useState(false);

    const { control, handleSubmit } = useCreateUserForm();

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
                onClose={() => setOpen(false)}
                content={<CreateUserForm control={control} />}
                actions={
                    <Stack direction="row" spacing={1}>
                        <Button
                            variant="text"
                            color="error"
                            onClick={() => setOpen(false)}
                            disabled={false}
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
                            loading={false}
                        >
                            <FormattedMessage
                                id="users.create.button"
                                defaultMessage="Invite"
                            />
                    </Button>
                </Stack>
                }
                onSubmit={() => {}}
            />
        </>
    )
};