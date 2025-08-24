
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';

import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';

import { ChevronDown, EllipsisVertical, SquarePen, ShieldCheck, ShieldMinus } from 'lucide-react'

import { ExtendedTheme } from '@avyyx/admin-ui';
import { UsersQueryResponse } from '../../hooks/useUsersQuery';



type UsersTableProps = {
    usersQueryResponse: UsersQueryResponse;
}

const intlMessages = defineMessages({
    inactive: {
        id: 'users.table.inactive',
        defaultMessage: 'Inactive'
    },
    active: {
        id: 'users.table.active',
        defaultMessage: 'Active'
    },
    edit: {
        id: 'users.table.edit',
        defaultMessage: 'Edit'
    },
    deactivate: {
        id: 'users.table.deactivate',
        defaultMessage: 'Deactivate'
    },
    activate: {
        id: 'users.table.activate',
        defaultMessage: 'Activate'
    },
})


export const UsersTable = ({ usersQueryResponse }: UsersTableProps) => {
    const { palette } = useTheme<ExtendedTheme>()
    const { formatMessage } = useIntl()
    const [projectMenuAnchorEl, setProjectMenuAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedUserProjects, setSelectedUserProjects] = useState<UsersQueryResponse['data'][number]['projects'] | null>(null);
    
    const [selectedUser, setSelectedUser] = useState<UsersQueryResponse['data'][number] | null>(null);
    const [selectedUserMenuAnchorEl, setSelectedUserMenuAnchorEl] = useState<null | HTMLElement>(null);

    const handleProjectMenuOpen = (event: React.MouseEvent<HTMLElement>, projects: UsersQueryResponse['data'][number]['projects']) => {
        setProjectMenuAnchorEl(event.currentTarget);
        setSelectedUserProjects(projects);
    };
    const handleProjectMenuClose = () => {
        setProjectMenuAnchorEl(null);
        setSelectedUserProjects(null);
    };

    const handleSelectedUserMenuOpen = (event: React.MouseEvent<HTMLElement>, user: UsersQueryResponse['data'][number]) => {
        setSelectedUserMenuAnchorEl(event.currentTarget);
        setSelectedUser(user);
    };
    const handleSelectedUserMenuClose = () => {
        setSelectedUserMenuAnchorEl(null);
        setSelectedUser(null);
    };

    return (
        <TableContainer component={Paper} sx={{
            borderRadius: 2,
            boxShadow: 'none',
            border: '1px solid',
            borderColor: 'divider',
            p: 2
        }}>
            <Table>
                <TableHead>
                    <TableRow sx={{
                        '& th': {
                            fontWeight: 600,
                            color: 'text.primary',
                            fontSize: 14,
                            backgroundColor: palette.gray[100],
                            lineHeight: 0.75,
                        },
                        '& th:first-of-type': {
                            borderTopLeftRadius: 8,
                            borderBottomLeftRadius: 8,
                        },
                        '& th:last-of-type': {
                            borderTopRightRadius: 8,
                            borderBottomRightRadius: 8,
                        }
                    }}>
                        <TableCell>
                            <FormattedMessage
                                id="users.table.User"
                                defaultMessage="User"
                            />
                        </TableCell>
                        <TableCell align="left">
                            <FormattedMessage
                                id="users.table.role"
                                defaultMessage="Role"
                            />
                        </TableCell>
                        <TableCell align="left">
                            <FormattedMessage
                                id="users.table.projects"
                                defaultMessage="Projects"
                            />
                        </TableCell>
                        <TableCell align="left">
                            <FormattedMessage
                                id="users.table.status"
                                defaultMessage="Status"
                            />
                        </TableCell>
                        <TableCell align="left">
                            <FormattedMessage
                                id="users.table.actions"
                                defaultMessage="Actions"
                            />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {usersQueryResponse.data.map((user) => (
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
                                {user.roles && user.roles.length > 0 ? user.roles[0].name : ''}
                            </TableCell>
                            <TableCell align="left">
                                {user.projects && user.projects.length > 0 ? <Button 
                                    variant="text" 
                                    size="small" 
                                    sx={{
                                        fontWeight: 400,
                                    }}
                                    onClick={(e) => handleProjectMenuOpen(e, user.projects || [])}
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
                                {user.deletedAt ? (
                                    <Chip
                                        color="error"
                                        variant="outlined"
                                        label={formatMessage(
                                            intlMessages.inactive
                                        )}
                                        size="small"
                                    />
                                ) : (
                                    <Chip
                                        color="success"
                                        variant="outlined"
                                        label={formatMessage(intlMessages.active)}
                                        size="small"
                                    />
                                )}
                            </TableCell>
                            <TableCell align="left">
                                <IconButton
                                    onClick={(e) => handleSelectedUserMenuOpen(e, user)}
                                >
                                    <EllipsisVertical size={16} />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {selectedUserProjects && (
                <Menu
                    anchorEl={projectMenuAnchorEl}
                    open={Boolean(projectMenuAnchorEl)}
                    onClose={handleProjectMenuClose}
                >
                    {selectedUserProjects.map(p => (
                        <MenuItem key={p.id} >
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
            )}
            {selectedUser && (
                <Menu
                    anchorEl={selectedUserMenuAnchorEl}
                    open={Boolean(selectedUserMenuAnchorEl)}
                    onClose={handleSelectedUserMenuClose}
                >
                    <MenuItem onClick={() => handleSelectedUserMenuClose()}>
                        <SquarePen size={16} />
                        <Typography variant="body2" color="text.primary" sx={{
                            ml: 1
                        }}>
                            {formatMessage(intlMessages.edit)}
                        </Typography>
                    </MenuItem>
                    {!selectedUser.deletedAt ? <MenuItem onClick={() => handleSelectedUserMenuClose()} sx={{
                        color: 'error.main'
                    }}>
                        <ShieldCheck size={16} />
                        <Typography variant="body2" sx={{
                            ml: 1
                        }}>
                            {formatMessage(intlMessages.deactivate)}
                        </Typography>
                    </MenuItem> :
                    <MenuItem onClick={() => handleSelectedUserMenuClose()}>
                        <ShieldMinus size={16} />
                        <Typography variant="body2" color="text.primary" sx={{
                            ml: 1
                        }}>
                            {formatMessage(intlMessages.activate)}
                        </Typography>
                    </MenuItem>
                    }
                </Menu>
            )}
        </TableContainer>
    );
}