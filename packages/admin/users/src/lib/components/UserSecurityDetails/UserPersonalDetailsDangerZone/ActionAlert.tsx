import { Alert, AlertTitle, Button, Stack, Typography } from "@mui/material"
import { type ReactNode } from "react"

type ActionAlertProps = {
    severity: 'success' | 'info' | 'warning' | 'error'
    title: ReactNode
    description?: ReactNode
    actionLabel?: ReactNode
    onAction?: () => void
    actionColor?: 'primary' | 'inherit' | 'secondary' | 'success' | 'info' | 'warning' | 'error'
}

export const ActionAlert = ({
    severity,
    title,
    description,
    actionLabel,
    onAction,
    actionColor = 'primary',
}: ActionAlertProps) => {
    return (
        <Alert severity={severity} sx={{
            '& .MuiAlert-message': {
                width: '100%',
            }
        }}>
            <AlertTitle>
                <Typography variant="body1">
                    {title}
                </Typography>
            </AlertTitle>
                {description && (
                    <Typography variant="body2">
                        {description}
                    </Typography>
                )}
                {actionLabel && (
                    <Stack mt={2} direction="row" justifyContent="flex-end" width="100%">
                        <Button variant="contained" color={actionColor} onClick={onAction}>
                            {actionLabel}
                        </Button>
                    </Stack>
                )}
        </Alert>
    )
}


