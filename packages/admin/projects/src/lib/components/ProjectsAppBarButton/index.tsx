import { AppBarButton, ExtendedTheme } from '@content/admin-ui';
import { MenuItem, Typography, useMediaQuery, useTheme } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useLocation, useNavigate } from 'react-router-dom';
import { PROJECTS_ROUTES } from '../../constants';


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
            <MenuItem selected={pathname.includes(PROJECTS_ROUTES.PROJECTS)} onClick={() => {
                navigate(PROJECTS_ROUTES.PROJECTS)
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
            href={PROJECTS_ROUTES.PROJECTS}
            selected={pathname.includes(PROJECTS_ROUTES.PROJECTS)}
            label={<FormattedMessage 
                id="main.navbar.projects"
                defaultMessage="Projects"
            />}
        />
    )
}