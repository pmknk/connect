import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type User = {
    id: string;
    fullName: string;
    email: string;
};

type UserMenuItemProps = {
    user: User;
};

export const UserMenuItem = ({ user }: UserMenuItemProps) => (
    <MenuItem value={user.id}>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
            }}
        >
            <Typography variant="body2">
                {user.fullName}
            </Typography>
            <Typography
                variant="caption"
                color="text.secondary"
            >
                {user.email}
            </Typography>
        </Box>
    </MenuItem>
); 