import { AppBarButton } from '@avyyx/admin-ui';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router-dom';

const PROJECTS_ROUTE = '/projects'

export const ProjectsAppBarButton = () => {
    const { pathname } = useLocation();

    return (
        <AppBarButton
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