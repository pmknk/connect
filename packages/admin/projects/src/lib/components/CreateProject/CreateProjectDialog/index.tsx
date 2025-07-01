import { FormattedMessage } from "react-intl";
import { Box } from "lucide-react";
import { type ExtendedTheme } from "@avyyx/admin-ui";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle"
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";

type CreateProjectDialogProps = {
    open: boolean;
    onClose: () => void;
    content: React.ReactNode;
    actions: React.ReactNode;
}

export const CreateProjectDialog = ({ open, onClose, content, actions }: CreateProjectDialogProps) => {
    const {palette} = useTheme<ExtendedTheme>()
    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDialog-paper': {
                    maxWidth: '420px',
                    width: '100%',
                }
            }}
        >
            <DialogTitle sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: 2,
            }}>
                <Box size={74} strokeWidth={0.8} color={palette.primary.main}/>
                <Stack spacing={1}>
                    <Typography variant="h6">
                        <FormattedMessage
                            id="projects.create.title"
                            defaultMessage="Create project"
                        />
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <FormattedMessage
                            id="projects.create.description"
                            defaultMessage="You can modify these details any time in your project settings"
                        />
                    </Typography>
                </Stack>
            </DialogTitle>
            <DialogContent>
                {content}
            </DialogContent>
            <DialogActions>

            </DialogActions>
        </Dialog>
    )
}