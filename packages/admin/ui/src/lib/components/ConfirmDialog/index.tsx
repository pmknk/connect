import { ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { DialogProps } from '@mui/material/Dialog';

export type ConfirmDialogAction = {
    label: ReactNode;
    onClick: () => void | Promise<void>;
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    variant?: 'text' | 'outlined' | 'contained';
    autoFocus?: boolean;
    disabled?: boolean;
    key?: string;
    loading?: boolean;
};

export type ConfirmDialogProps = {
    open: boolean;
    onClose?: (event: object, reason?: 'backdropClick' | 'escapeKeyDown') => void;
    title?: ReactNode;
    body?: ReactNode;
    actions?: ConfirmDialogAction[];
    maxWidth?: DialogProps['maxWidth'];
    fullWidth?: boolean;
};

export const ConfirmDialog = ({
    open,
    onClose,
    title,
    body,
    actions = [],
    maxWidth = 'xs',
    fullWidth = true
}: ConfirmDialogProps) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={maxWidth}
            fullWidth={fullWidth}
            aria-labelledby={title ? 'confirm-dialog-title' : undefined}
        >
            {title && (
                <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
            )}
            {body && (
                <DialogContent>
                    {typeof body === 'string' ? (
                        <Typography variant="body2">{body}</Typography>
                    ) : (
                        body
                    )}
                </DialogContent>
            )}
            {actions.length > 0 && (
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    {actions.map((action, index) => (
                        <Button
                            key={action.key ?? String(index)}
                            onClick={action.onClick}
                            color={action.color ?? 'primary'}
                            variant={action.variant ?? 'text'}
                            autoFocus={action.autoFocus}
                            disabled={action.disabled}
                            loading={action.loading}
                        >
                            {action.label}
                        </Button>
                    ))}
                </DialogActions>
            )}
        </Dialog>
    );
};


