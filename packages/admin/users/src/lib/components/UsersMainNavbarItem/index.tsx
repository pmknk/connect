import { FormattedMessage } from 'react-intl';
import { MainMenuItem } from '@avyyx/admin-ui'
import { useLocation } from 'react-router-dom';

const USERS_ROUTE = '/users'

export const UsersMainNavbarItem = () => {
    const { pathname } = useLocation();
    return (
        <MainMenuItem
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