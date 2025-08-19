
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useTheme } from '@mui/material/styles';

import { FormattedMessage } from 'react-intl';

import { ExtendedTheme } from '@avyyx/admin-ui';

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export const UsersTable = () => {
    const { palette } = useTheme<ExtendedTheme>()
    
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
                {rows.map((row) => (
                        <TableRow
                            key={row.name}
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
                            <TableCell align="left">{row.calories}</TableCell>
                            <TableCell align="left">{row.fat}</TableCell>
                            <TableCell align="left">{row.carbs}</TableCell>
                            <TableCell align="left">{row.protein}</TableCell>
                            <TableCell align="left">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}