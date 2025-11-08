import {
    createContext,
    ReactNode,
    useCallback,
    useMemo,
    useState
} from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export type SnackbarSeverity = 'success' | 'info' | 'warning' | 'error';

type SnackbarContextValue = {
    showSnackbar: (options: {
        message: string;
        severity?: SnackbarSeverity;
        autoHideDurationMs?: number;
    }) => void;
};

export const SnackbarContext = createContext<SnackbarContextValue>(
    {} as SnackbarContextValue
);

type SnackbarProviderProps = {
    children: ReactNode;
};

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<SnackbarSeverity>('success');
    const [autoHideDurationMs, setAutoHideDurationMs] = useState<number>(3000);

    const showSnackbar = useCallback(
        ({
            message,
            severity = 'success',
            autoHideDurationMs = 3000
        }: {
            message: string;
            severity?: SnackbarSeverity;
            autoHideDurationMs?: number;
        }) => {
            setMessage(message);
            setSeverity(severity);
            setAutoHideDurationMs(autoHideDurationMs);
            setOpen(true);
        },
        []
    );

    const value = useMemo(() => ({ showSnackbar }), [showSnackbar]);

    return (
        <SnackbarContext.Provider value={value}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={autoHideDurationMs}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert severity={severity}>{message}</Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};
