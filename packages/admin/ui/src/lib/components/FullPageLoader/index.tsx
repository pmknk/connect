import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type FullPageLoaderProps = {
    showLogo?: boolean;
    showSpinner?: boolean;
    loadingText?: string | React.ReactNode;
};

/**
 * Full page loader component
 * @returns {React.ReactNode} Full page loader component
 */
export const FullPageLoader = ({
    showLogo,
    showSpinner,
    loadingText
}: FullPageLoaderProps) => {
    return (
        <Stack
            spacing={1}
            direction="column"
            justifyContent="center"
            alignItems="center"
            height="100%"
            width="100%"
        >
            {showSpinner && <CircularProgress />}
            {showLogo && (
                <Typography variant="h5" fontWeight={300}>
                    Content Studio
                </Typography>
            )}
            {loadingText && (
                <Typography variant="body1" color="text.secondary">
                    {loadingText}
                </Typography>
            )}
        </Stack>
    );
};
