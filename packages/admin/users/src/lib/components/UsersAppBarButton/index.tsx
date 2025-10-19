import { FormattedMessage } from 'react-intl';
import { AppBarButton, ExtendedTheme } from '@connect/admin-ui'
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { MenuItem, Typography, useMediaQuery } from '@mui/material';

import { USERS_ROUTE } from '../../constants';

type UsersAppBarButtonProps = {
    onClick?: () => void;
}

export const UsersAppBarButton = ({ onClick }: UsersAppBarButtonProps) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { breakpoints } = useTheme<ExtendedTheme>();
    const isMobile = useMediaQuery(breakpoints.down('sm'));

    if (isMobile) {
        return (
            <MenuItem selected={pathname.includes(USERS_ROUTE)} onClick={() => {
                navigate(USERS_ROUTE)
                onClick?.()
            }}>
                <Typography variant="body2">
                    <FormattedMessage
                        id="main.navbar.users"
                        defaultMessage="Users"
                    />
                </Typography>
            </MenuItem>
        )
    }
    return (
        <AppBarButton
            key={'users'}
            href={USERS_ROUTE}
            selected={pathname.includes(USERS_ROUTE)}
            label={<FormattedMessage 
                id="main.navbar.users"
                defaultMessage="Users"
            />}
        />
    )
}