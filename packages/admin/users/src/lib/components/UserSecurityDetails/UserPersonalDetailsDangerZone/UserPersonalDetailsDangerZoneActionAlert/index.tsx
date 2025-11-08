import { Alert, AlertTitle, Button, Stack, Typography } from '@mui/material';
import { type ReactNode } from 'react';

/**
 * Props for the ActionAlert component.
 */
type ActionAlertProps = {
    /**
     * Severity level of the alert.
     * Can be 'success', 'info', 'warning', or 'error'.
     */
    severity: 'success' | 'info' | 'warning' | 'error';
    /**
     * The title to display in the alert.
     */
    title: ReactNode;
    /**
     * Optional description content of the alert.
     */
    description?: ReactNode;
    /**
     * Optional label for the action button.
     */
    actionLabel?: ReactNode;
    /**
     * Optional callback function when the action button is clicked.
     */
    onAction?: () => void;
    /**
     * Optional color for the action button.
     * Defaults to 'primary'.
     */
    actionColor?:
        | 'primary'
        | 'inherit'
        | 'secondary'
        | 'success'
        | 'info'
        | 'warning'
        | 'error';
};

/**
 * A UI component that displays a Material-UI Alert with an optional
 * action button and description. Designed for use in user detail
 * danger zones where critical actions (e.g., delete, disable, etc.) may be performed.
 *
 * @param {ActionAlertProps} props - The props for the component.
 * @returns {JSX.Element} The rendered alert component.
 */
export const UserPersonalDetailsDangerZoneActionAlert = ({
    severity,
    title,
    description,
    actionLabel,
    onAction,
    actionColor = 'primary'
}: ActionAlertProps) => {
    return (
        <Alert
            severity={severity}
            sx={{
                '& .MuiAlert-message': {
                    width: '100%'
                }
            }}
        >
            <AlertTitle>
                <Typography variant="body1">{title}</Typography>
            </AlertTitle>
            {description && (
                <Typography variant="body2">{description}</Typography>
            )}
            {actionLabel && (
                <Stack
                    mt={2}
                    direction="row"
                    justifyContent="flex-end"
                    width="100%"
                >
                    <Button
                        variant="contained"
                        color={actionColor}
                        onClick={onAction}
                    >
                        {actionLabel}
                    </Button>
                </Stack>
            )}
        </Alert>
    );
};
