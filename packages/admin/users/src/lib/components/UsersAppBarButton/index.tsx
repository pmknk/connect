import { FormattedMessage } from 'react-intl';
import { AppBarButton } from '@avyyx/admin-ui'
import { useLocation } from 'react-router-dom';

const USERS_ROUTE = '/users'

export const UsersAppBarButton = () => {
    const { pathname } = useLocation();
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