import { Button, Stack, Typography } from "@mui/material"
import { defineMessages, useIntl } from "react-intl"

const intlMessages = defineMessages({
    dangerZone: {
        id: 'users.personalDetails.dangerZone',
        defaultMessage: 'Danger Zone'
    },
    deactivateAccount: {
        id: 'users.personalDetails.deactivateAccount',
        defaultMessage: 'Deactivate'
    },
    deactivateAccountDescription: {
        id: 'users.personalDetails.deactivateAccountDescription',
        defaultMessage: 'Deactivate the account of the user. This will prevent the user from logging in and accessing the platform.'
    }
})

export const UserPersonalDetailsDangerZone = () => {
    const { formatMessage } = useIntl();
    return (
        <Stack spacing={3} sx={{ mt: 3 }}>
            <Typography variant="body1">
                {formatMessage(intlMessages.dangerZone)}
            </Typography>
            <Stack spacing={2}>
                <Typography variant="body2" color="text.secondary">
                    {formatMessage(intlMessages.deactivateAccountDescription)}
                </Typography>
                <Stack spacing={2} direction="row" justifyContent="flex-end">
                    <Button variant="contained" color="error">
                        {formatMessage(intlMessages.deactivateAccount)}
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    )
}