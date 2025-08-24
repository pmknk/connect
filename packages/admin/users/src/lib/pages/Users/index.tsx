import { Stack, TablePagination, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import Container from "@mui/material/Container"
import { ExtendedTheme } from "@avyyx/admin-ui";
import { FormattedMessage } from "react-intl";
import { UsersTable } from "../../components/UsersTable";
import { useUsersQuery } from "../../hooks/useUsersQuery";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { UsersTableSkeleton } from "../../components/UsersTable/UsersTableSkeleton";

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
        const allowed = [10, 20, 50, 100];
        return allowed.includes(limitParam) ? limitParam : 10;
    }, [searchParams]);

    const page = useMemo(() => {
        const pageParam = Number(searchParams.get('page'));
        return Number.isFinite(pageParam) && pageParam >= 1 ? pageParam - 1 : 0;
    }, [searchParams]);

    const { data: usersQueryResponse, isLoading, isFetching } = useUsersQuery(page + 1, rowsPerPage, search)

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
                    >
                        <TextField
                            name="search"
                            type="text"
                            placeholder="Search"
                            onChange={(e) => {
                                const next = new URLSearchParams(searchParams);
                                next.set('search', e.target.value);
                                setSearchParams(next, { replace: true });
                            }}
                            value={search}
                            size="small"
                            sx={{
                                width: '100%',
                                maxWidth: '320px'
                            }}
                        />
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
                            rowsPerPageOptions={[10, 20, 50, 100]}
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