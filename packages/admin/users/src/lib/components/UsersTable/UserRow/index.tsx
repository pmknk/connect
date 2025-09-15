import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';

import { ChevronDown, Pencil } from 'lucide-react';

import { ExtendedTheme } from '@avyyx/admin-ui';
import { PermissionAccess, useUser } from '@avyyx/admin-utils';

import { UsersQueryResponse } from '../../../hooks/useUsersQuery';
import { defineMessages, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

type UserRowProps = {
    user: UsersQueryResponse['data'][number];
    onOpenProjects: (event: React.MouseEvent<HTMLElement>, projects: UsersQueryResponse['data'][number]['projects']) => void;
    onOpenActions: (event: React.MouseEvent<HTMLElement>, user: UsersQueryResponse['data'][number]) => void;
};

const intlMessages = defineMessages({
    edit: {
        id: 'users.table.edit',
        defaultMessage: 'Edit'
    }
});

export const UserRow = ({ user, onOpenProjects, onOpenActions }: UserRowProps) => {
    const { formatMessage } = useIntl();
    const { palette } = useTheme<ExtendedTheme>();
    const { user: currentUser } = useUser();

    const isCurrentUser = currentUser?.id === user.id;

    const getUserStatus = () => {
        if (user.deletedAt) {
            return (
                <Chip
                    color="error"
                    variant="outlined"
                    label={'Inactive'}
                    size="small"
                />
            )
        }
        if (user.invite) {
            return (
                <Chip
                    color="warning"
                    variant="outlined"
                    label={'Invited'}
                    size="small"
                />
            )
        }
        return (
            <Chip
                color="success"
                variant="outlined"
                label={'Active'}
                size="small"
            />
        )
    }

    return (
        <TableRow
            key={user.id}
            sx={{ 
                '&:last-child td, &:last-child th': { 
                    border: 0,
                },
                '& td': {
                    borderBottom: '1px solid',
                    borderColor: 'divider'
                }
            }}
        >
            <TableCell align="left">
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar variant="rounded" sx={{
                        backgroundColor: palette.primary.main,
                        width: 32,
                        height: 32,
                        fontSize: 14,
                    }}>
                        {user.fullName
                            .split(' ')
                            .filter(Boolean)
                            .slice(0, 2)
                            .map(name => name.charAt(0))
                            .join('')
                            .toUpperCase()}
                    </Avatar>
                    <Stack direction="column" spacing={0.1}>
                        <Typography variant="body1">{user.fullName}</Typography>
                        <Typography variant="body2" color="text.secondary">{user.email}</Typography>
                    </Stack>
                </Stack>
            </TableCell>
            <TableCell align="left">
                <Tooltip 
                    title={user.roles[0].description}
                    sx={{
                        cursor: 'pointer',
                    }}
                    placement="top"
                >
                    <Typography variant="body2">
                        {user.roles && user.roles.length > 0 ? user.roles[0].name : ''}
                    </Typography>
                </Tooltip>
            </TableCell>
            <TableCell align="left">
                {user.projects && user.projects.length > 0 ? <Button 
                    variant="text" 
                    size="small" 
                    sx={{
                        fontWeight: 400,
                    }}
                    onClick={(e) => onOpenProjects(e, user.projects || [])}
                    endIcon={<ChevronDown size={16} />}
                >
                    {user.projects && user.projects.length > 0 ? (() => {
                        const projectNames = user.projects.map(p => p.name).join(', ');
                        const maxLength = 40;
                        if (projectNames.length > maxLength) {
                            return projectNames.slice(0, maxLength - 1) + '…';
                        }
                        return projectNames;
                    })(): ''}
                </Button> : '-'}
            </TableCell>
            <TableCell align="left">
                {getUserStatus()}
            </TableCell>
            <TableCell align="left">
                {isCurrentUser ? null : (
                    <PermissionAccess permissions={[
                        { action: 'update', resource: 'admin:user' },
                        { action: 'delete', resource: 'admin:user' }
                    ]} operator="OR">
                        <Tooltip title={formatMessage(intlMessages.edit)}>
                            <IconButton component={Link} to={`/users/${user.id}`}>
                                <Pencil size={16} />
                            </IconButton>
                        </Tooltip>
                    </PermissionAccess>
                )}
            </TableCell>
        </TableRow>
    );
};

export default UserRow;


