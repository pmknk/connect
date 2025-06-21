import { MainMenuItem } from '@avyyx/admin-ui';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router-dom';

const PROJECTS_ROUTE = '/projects'

export const ProjectsMainNavbarItem = () => {
    const { pathname } = useLocation();

    return (
        <MainMenuItem
            key={'projects'}
            href={PROJECTS_ROUTE}
            selected={pathname.includes(PROJECTS_ROUTE)}
            label={<FormattedMessage 
                id="main.navbar.projects"
                defaultMessage="Projects"
            />}
        />
    )
}