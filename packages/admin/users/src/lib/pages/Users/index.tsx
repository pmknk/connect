import Stack from "@mui/material/Stack";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import Container from "@mui/material/Container"
import { useTheme } from "@mui/material";

import { ExtendedTheme } from "@avyyx/admin-ui";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import { UsersTable } from "../../components/UsersTable";
import { UsersTableSkeleton } from "../../components/UsersTable/UsersTableSkeleton";
import { CreateUser } from "../../components/CreateUser";

import { useUsersQuery } from "../../hooks/useUsersQuery";
import { ROWS_PER_USERS_PAGE_OPTIONS } from "../../constants";

const Users = () => {
    const [initialLoading, setInitialLoading] = useState(true);
    const { breakpoints } = useTheme<ExtendedTheme>();
    const isMobile = useMediaQuery(breakpoints.down('sm'));

    const [searchParams, setSearchParams] = useSearchParams();

    const search = useMemo(() => {
        return searchParams.get('search') || '';
    }, [searchParams]);

    const rowsPerPage = useMemo(() => {
        const limitParam = Number(searchParams.get('limit'));
        const allowed = ROWS_PER_USERS_PAGE_OPTIONS;
        return allowed.includes(limitParam) ? limitParam : ROWS_PER_USERS_PAGE_OPTIONS[0];
    }, [searchParams]);

    const page = useMemo(() => {
        const pageParam = Number(searchParams.get('page'));
        return Number.isFinite(pageParam) && pageParam >= 1 ? pageParam - 1 : 0;
    }, [searchParams]);

    const { data: usersQueryResponse, isLoading, isFetching, refetch } = useUsersQuery(page + 1, rowsPerPage, search)

    useEffect(() => {
        if (usersQueryResponse) {
            setInitialLoading(false);
        }
    }, [usersQueryResponse]);

    return (
        <Container
            maxWidth={'xl'}
            sx={{
                my: isMobile ? 3 : 4,
                pb: isMobile ? 8 : 0
            }}
        >
            <Stack direction="column" spacing={1}>
                <Typography variant="h5">
                    <FormattedMessage
                        id="users.title"
                        defaultMessage="Users"
                    />
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    <FormattedMessage
                        id="users.description"
                        defaultMessage="List of all users"
                    />
                </Typography>
            </Stack>
            {initialLoading ? (
                <Stack sx={{ mt: 4 }}>
                    <UsersTableSkeleton rows={rowsPerPage} />
                </Stack>
            ) : (
                <Stack sx={{ mt: 4 }} gap={4}>
                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        width="100%"
                        justifyContent="space-between"
                    >
                        <TextField
                            name="search"
                            type="text"
                            placeholder="Search"
                            onChange={(e) => {
                                const next = new URLSearchParams(searchParams);
                                next.set('search', e.target.value);
                                next.set('page', '1');
                                setSearchParams(next, { replace: true });
                            }}
                            value={search}
                            size="small"
                            sx={{
                                width: '100%',
                                maxWidth: '320px'
                            }}
                        />
                        <CreateUser onSuccess={refetch} />
                    </Stack>
                    <Stack gap={2}>
                        {(isLoading || isFetching) && <UsersTableSkeleton rows={rowsPerPage} />}
                        {usersQueryResponse && !isLoading && !isFetching && <UsersTable 
                            usersQueryResponse={usersQueryResponse}
                        />}
                        {usersQueryResponse?.meta && <TablePagination
                            component={'div'}
                            count={usersQueryResponse.meta.total }
                            page={Math.floor(usersQueryResponse.meta.offset / usersQueryResponse.meta.limit)}
                            rowsPerPage={usersQueryResponse.meta.limit}
                            rowsPerPageOptions={ROWS_PER_USERS_PAGE_OPTIONS}
                            onPageChange={(_, page) => {
                                const next = new URLSearchParams(searchParams);
                                next.set('page', String(page + 1));
                                setSearchParams(next, { replace: true });
                            }}
                            onRowsPerPageChange={(event) => {
                                const next = new URLSearchParams(searchParams);
                                next.set('limit', String(Number(event.target.value)));
                                next.set('page', '1');
                                setSearchParams(next, { replace: true });
                            }}
                        />}
                    </Stack>
                </Stack>
            )}
        </Container>
    )
}

export default Users