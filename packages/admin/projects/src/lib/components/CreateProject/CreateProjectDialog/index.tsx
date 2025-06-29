import { FormattedMessage } from "react-intl";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle"

type CreateProjectDialogProps = {
    open: boolean;
    onClose: () => void;
    content: React.ReactNode;
    actions: React.ReactNode;
}

export const CreateProjectDialog = ({ open, onClose, content, actions }: CreateProjectDialogProps) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <FormattedMessage
                    id="projects.create.title"
                    defaultMessage="Create Project"
                />
            </DialogTitle>
            <DialogContent>
                {content}
            </DialogContent>
            <DialogActions>

            </DialogActions>
        </Dialog>
    )
}