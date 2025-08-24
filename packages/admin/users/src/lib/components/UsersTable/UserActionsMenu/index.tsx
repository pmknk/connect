import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { defineMessages, useIntl } from 'react-intl';
import { SquarePen, ShieldCheck, ShieldMinus } from 'lucide-react';

import { usePermissionAccess } from '@avyyx/admin-utils';
import { UsersQueryResponse } from '../../../hooks/useUsersQuery';

const intlMessages = defineMessages({
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
});

type UserActionsMenuProps = {
    anchorEl: null | HTMLElement;
    user: UsersQueryResponse['data'][number] | null;
    onClose: () => void;
    hasDeletePermission: boolean;
    hasUpdatePermission: boolean;
};

export const UserActionsMenu = ({ anchorEl, user, onClose, hasDeletePermission, hasUpdatePermission }: UserActionsMenuProps) => {
    const { formatMessage } = useIntl();



    if (!user) return null;

    return (
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
            {hasUpdatePermission && (
                <MenuItem onClick={onClose}>
                    <SquarePen size={16} />
                    <Typography variant="body2" color="text.primary" sx={{ ml: 1 }}>
                        {formatMessage(intlMessages.edit)}
                    </Typography>
                </MenuItem>
            )}
            {!user.deletedAt ? (
                hasDeletePermission && <MenuItem onClick={onClose} sx={{ color: 'error.main' }}>
                    <ShieldCheck size={16} />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                        {formatMessage(intlMessages.deactivate)}
                    </Typography>
                </MenuItem>
            ) : (
                hasUpdatePermission && <MenuItem onClick={onClose}>
                    <ShieldMinus size={16} />
                    <Typography variant="body2" color="text.primary" sx={{ ml: 1 }}>
                        {formatMessage(intlMessages.activate)}
                    </Typography>
                </MenuItem>
            )}
        </Menu>
    );
};

export default UserActionsMenu;


