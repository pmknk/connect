import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { ExtendedTheme } from '@connect/admin-ui';
import { UsersQueryResponse } from '../../../hooks/useUsersQuery';

type ProjectsMenuProps = {
    anchorEl: null | HTMLElement;
    projects: UsersQueryResponse['data'][number]['projects'] | null;
    onClose: () => void;
};

export const ProjectsMenu = ({ anchorEl, projects, onClose }: ProjectsMenuProps) => {
    const { palette } = useTheme<ExtendedTheme>();

    if (!projects) return null;

    return (
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
            {projects.map(p => (
                <MenuItem key={p.id}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar variant="rounded" sx={{
                            backgroundColor: palette.primary.main,
                            width: 28,
                            height: 28,
                            fontSize: 14,
                        }}>
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


