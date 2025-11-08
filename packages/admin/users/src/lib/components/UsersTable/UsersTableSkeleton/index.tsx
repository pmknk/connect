import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import TableHeader from '../TableHeader';

type UsersTableSkeletonProps = {
    rows?: number;
};

export const UsersTableSkeleton = ({ rows = 10 }: UsersTableSkeletonProps) => {
    return (
        <TableContainer
            component={Paper}
            sx={{
                borderRadius: 2,
                boxShadow: 'none',
                border: '1px solid',
                borderColor: 'divider',
                p: 2,
                boxSizing: 'border-box'
            }}
        >
            <Table>
                <TableHead>
                    <TableHeader />
                </TableHead>
                <TableBody>
                    {Array.from({ length: rows }).map((_, index) => (
                        <TableRow
                            key={index}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0
                                },
                                '& td': {
                                    borderBottom: '1px solid',
                                    borderColor: 'divider'
                                }
                            }}
                        >
                            <TableCell align="left">
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    alignItems="center"
                                >
                                    <Skeleton
                                        variant="circular"
                                        width={32}
                                        height={32}
                                    />
                                    <Stack direction="column" spacing={0.5}>
                                        <Skeleton
                                            variant="text"
                                            width={140}
                                            height={20}
                                        />
                                        <Skeleton
                                            variant="text"
                                            width={200}
                                            height={18}
                                        />
                                    </Stack>
                                </Stack>
                            </TableCell>
                            <TableCell align="left">
                                <Skeleton
                                    variant="text"
                                    width={100}
                                    height={20}
                                />
                            </TableCell>
                            <TableCell align="left">
                                <Skeleton
                                    variant="text"
                                    width={180}
                                    height={20}
                                />
                            </TableCell>
                            <TableCell align="left">
                                <Skeleton
                                    variant="rounded"
                                    width={72}
                                    height={24}
                                />
                            </TableCell>
                            <TableCell align="left">
                                <Skeleton
                                    variant="circular"
                                    width={24}
                                    height={24}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UsersTableSkeleton;
