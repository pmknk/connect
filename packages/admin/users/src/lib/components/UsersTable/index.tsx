
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';

import { usePermissionAccess } from '@avyyx/admin-utils';

import { useState } from 'react';
import { UsersQueryResponse } from '../../hooks/useUsersQuery';

import TableHeader from './TableHeader';
import UserRow from './UserRow';
import ProjectsMenu from './ProjectsMenu';
import UserActionsMenu from './UserActionsMenu';


type UsersTableProps = {
    usersQueryResponse: UsersQueryResponse;
}

export const UsersTable = ({ usersQueryResponse }: UsersTableProps) => {
    const [projectMenuAnchorEl, setProjectMenuAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedUserProjects, setSelectedUserProjects] = useState<UsersQueryResponse['data'][number]['projects'] | null>(null);
    
    const [selectedUser, setSelectedUser] = useState<UsersQueryResponse['data'][number] | null>(null);
    const [selectedUserMenuAnchorEl, setSelectedUserMenuAnchorEl] = useState<null | HTMLElement>(null);

    const hasDeletePermission = usePermissionAccess({
        permissions: [
            {
                action: 'delete',
                resource: 'admin:user'
            }
        ]
    });
    const hasUpdatePermission = usePermissionAccess({
        permissions: [
            {
                action: 'update',
                resource: 'admin:user'
            }
        ]
    });


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
            boxSizing: 'border-box',
            p: 2,
        }}>
            <Table>
                <TableHead>
                    <TableHeader />
                </TableHead>
                <TableBody>
                {usersQueryResponse.data.map((user) => (
                        <UserRow 
                            key={user.id}
                            user={user}
                            onOpenProjects={handleProjectMenuOpen}
                            onOpenActions={handleSelectedUserMenuOpen}
                            hasDeletePermission={hasDeletePermission}
                            hasUpdatePermission={hasUpdatePermission}
                        />
                    ))}
                </TableBody>
            </Table>
            <ProjectsMenu 
                anchorEl={projectMenuAnchorEl}
                projects={selectedUserProjects}
                onClose={handleProjectMenuClose}
            />
            {(hasUpdatePermission || hasDeletePermission) && <UserActionsMenu 
                anchorEl={selectedUserMenuAnchorEl}
                user={selectedUser}
                onClose={handleSelectedUserMenuClose}
                hasDeletePermission={hasDeletePermission}
                hasUpdatePermission={hasUpdatePermission}
            />}
        </TableContainer>
    );
}