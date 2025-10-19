import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';
import { FormattedMessage } from 'react-intl';

import { ExtendedTheme } from '@connect/admin-ui';

export const TableHeader = () => {
    const { palette } = useTheme<ExtendedTheme>();

    return (
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
    );
};

export default TableHeader;


