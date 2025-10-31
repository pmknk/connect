import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { ExtendedTheme } from '@content/admin-ui';
import { UsersQueryResponse } from '../../../hooks/useUsersQuery';

type ProjectsMenuProps = {
    /**
     * The element to anchor the menu to.
     * If null, the menu will be closed.
     */
    anchorEl: null | HTMLElement;
    /**
     * The list of project objects to display in the menu.
     * If null, the menu will not render.
     */
    projects: UsersQueryResponse['data'][number]['projects'] | null;
    /**
     * Callback function called when the menu is closed.
     */
    onClose: () => void;
};

/**
 * ProjectsMenu component.
 *
 * Displays a Material-UI Menu containing a list of projects, each
 * represented with a colored avatar and project name.
 *
 * @param {ProjectsMenuProps} props - The props for ProjectsMenu.
 * @returns {JSX.Element | null} The rendered menu, or null if no projects.
 */
export const ProjectsMenu = ({ anchorEl, projects, onClose }: ProjectsMenuProps) => {
    const { palette } = useTheme<ExtendedTheme>();

    if (!projects) return null;

    return (
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={onClose}
            sx={{
                '& .MuiPaper-root': {
                    minWidth: '200px',
                },
            }}
        >
            {projects.map(p => (
                <MenuItem key={p.id}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar
                            variant="rounded"
                            sx={{
                                backgroundColor: palette.primary.main,
                                width: 28,
                                height: 28,
                                fontSize: 14,
                            }}
                        >
                            {p.name.charAt(0)}
                        </Avatar>
                        <Typography variant="body2">{p.name}</Typography>
                    </Stack>
                </MenuItem>
            ))}
        </Menu>
    );
};

export default ProjectsMenu;

