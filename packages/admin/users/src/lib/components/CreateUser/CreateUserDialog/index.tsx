import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useTheme } from '@mui/material/styles';
import { UsersRound } from 'lucide-react';
import { FormattedMessage } from 'react-intl';

import { type ExtendedTheme } from '@content/admin-ui';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

type CreateUserDialogProps = {
    open: boolean;
    onClose: () => void;
    content: React.ReactNode;
    actions: React.ReactNode;
    onSubmit: () => void;
};

export const CreateUserDialog = ({
    open,
    onClose,
    content,
    actions,
    onSubmit
}: CreateUserDialogProps) => {
    const { breakpoints, palette } = useTheme<ExtendedTheme>();
    const isMobile = useMediaQuery(breakpoints.down('sm'));

    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDialog-paper': {
                    width: '100%',
                    maxWidth: isMobile ? '100%' : '420px'
                }
            }}
            fullScreen={isMobile}
        >
            <form onSubmit={onSubmit}>
                <DialogTitle
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        gap: 2
                    }}
                >
                    <UsersRound
                        size={74}
                        strokeWidth={0.8}
                        color={palette.primary.main}
                    />
                    <Stack spacing={1}>
                        <Typography variant="h6">
                            <FormattedMessage
                                id="users.create.title"
                                defaultMessage="Invite User"
                            />
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <FormattedMessage
                                id="users.create.description"
                                defaultMessage="Invite a new user to the system. They will receive an invitation email to join."
                            />
                        </Typography>
                    </Stack>
                </DialogTitle>
                <DialogContent>{content}</DialogContent>
                <DialogActions
                    sx={{
                        px: 3,
                        py: 2
                    }}
                >
                    {actions}
                </DialogActions>
            </form>
        </Dialog>
    );
};
