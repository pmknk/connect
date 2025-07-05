import { defineMessages, useIntl } from 'react-intl';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const intlMessages = defineMessages({
    loadingMoreUsers: {
        id: 'projects.create.users.loadingMoreUsers',
        defaultMessage: 'Loading more users...'
    }
});

export const LoadingMenuItem = () => {
    const { formatMessage } = useIntl();

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
                    {formatMessage(intlMessages.loadingMoreUsers)}
                </Typography>
            </Box>
        </MenuItem>
    );
}; 