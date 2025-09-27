import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import { Check, Copy } from "lucide-react";

import { useCallback, useState } from "react";
import { defineMessages, useIntl } from "react-intl";
import Tooltip from "@mui/material/Tooltip";
import { Snackbar } from "@mui/material";

const intlMessages = defineMessages({
    pendingInvitation: {
        id: 'pendingInvitation',
        defaultMessage: 'Pending Invitation'
    },
    pendingInvitationIntro: {
        id: 'pendingInvitationIntro',
        defaultMessage: 'This user was invited to join. It is not active until they accept the invitation.'
    },
    invitationUrlLabel: {
        id: 'invitationUrlLabel',
        defaultMessage: 'Invitation Code'
    },
    copy: {
        id: 'copy',
        defaultMessage: 'Copy'
    },
    copied: {
        id: 'copied',
        defaultMessage: 'Copied'
    },
    invitationCopied: {
        id: 'invitationCopied',
        defaultMessage: 'Invitation URL copied to clipboard successfully'
    }
})

type PendingInvitationAcceptProps = {
    invitationCode: string;
}

export const PendingInvitationAccept = ({ invitationCode }: PendingInvitationAcceptProps) => {
    const { formatMessage } = useIntl();
    const [_copied, setCopied] = useState(false);
    const [open, setOpen] = useState(false);

    const handleCopy = useCallback(async (text: string) => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setOpen(true);
    }, []);

    return (
        <>
            <Alert severity="warning">
                <AlertTitle variant="body1">
                    {formatMessage(intlMessages.pendingInvitation)}
                </AlertTitle>
                <Typography variant="body2">
                    {formatMessage(intlMessages.pendingInvitationIntro)}
                </Typography>
                <Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {formatMessage(intlMessages.invitationUrlLabel)}:
                        </Typography>
                        <Box sx={{ flexGrow: 1, overflowWrap: 'anywhere', display: 'flex', alignItems: 'center', gap: 0.2 }}>
                            <Typography variant="body2">{invitationCode}</Typography>
                            <Tooltip title={_copied ? formatMessage(intlMessages.copied) : formatMessage(intlMessages.copy)}>
                                <IconButton onClick={() => handleCopy(invitationCode)}>
                                    <>{_copied ? <Check size={16} /> : <Copy size={16} />}</>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Stack>
                </Stack>
            </Alert>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert severity="success">
                    {formatMessage(intlMessages.invitationCopied)}
                </Alert>
            </Snackbar>
        </>
    )
}