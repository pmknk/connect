import { AppBarButton, ExtendedTheme } from '@content/admin-ui';
import { MenuItem, Typography, useMediaQuery, useTheme } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useLocation, useNavigate } from 'react-router-dom';

const PROJECTS_ROUTE = '/projects'

type ProjectsAppBarButtonProps = {
    onClick?: () => void;
}

export const ProjectsAppBarButton = ({ onClick }: ProjectsAppBarButtonProps) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { breakpoints } = useTheme<ExtendedTheme>();
    const isMobile = useMediaQuery(breakpoints.down('sm'));


    if (isMobile) {
        return (
            <MenuItem selected={pathname.includes(PROJECTS_ROUTE)} onClick={() => {
                navigate(PROJECTS_ROUTE)
                onClick?.()
            }}>
                <Typography variant="body2">
                    <FormattedMessage
                        id="main.navbar.projects"
                        defaultMessage="Projects"
                    />
                </Typography>
            </MenuItem>
        )
    }
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