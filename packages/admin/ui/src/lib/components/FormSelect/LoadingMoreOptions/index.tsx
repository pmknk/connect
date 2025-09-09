import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

type LoadingMenuItemProps = {
    label: React.ReactNode;
};

export const LoadingMoreOptions = ({ label }: LoadingMenuItemProps) => {
    return (
        <MenuItem disabled>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                }}
            >
                <CircularProgress size={16} />
                <Typography variant="body2">
                    {label}
                </Typography>
            </Box>
        </MenuItem>
    );
};