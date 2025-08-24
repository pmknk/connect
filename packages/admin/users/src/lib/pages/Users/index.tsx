import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Container from "@mui/material/Container"
import { ExtendedTheme } from "@avyyx/admin-ui";
import { FormattedMessage } from "react-intl";
import { UsersTable } from "../../components/UsersTable";
import { useUsersQuery } from "../../hooks/useUsersQuery";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { UsersTableSkeleton } from "../../components/UsersTable/UsersTableSkeleton";

const Users = () => {
    const { breakpoints } = useTheme<ExtendedTheme>();
    const isMobile = useMediaQuery(breakpoints.down('sm'));

    const [searchParams, setSearchParams] = useSearchParams();

    const rowsPerPage = useMemo(() => {
        const limitParam = Number(searchParams.get('limit'));
        const allowed = [10, 20, 50, 100];
        return allowed.includes(limitParam) ? limitParam : 10;
    }, [searchParams]);

    const page = useMemo(() => {
        const pageParam = Number(searchParams.get('page'));
        // Store page in URL as 1-based; convert to 0-based for UI state
        return Number.isFinite(pageParam) && pageParam >= 1 ? pageParam - 1 : 0;
    }, [searchParams]);

    const { data: usersQueryResponse, isLoading, isFetching } = useUsersQuery(page + 1, rowsPerPage)

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
            {(isLoading || isFetching) ? (
                <Stack sx={{ mt: 4 }}>
                    <UsersTableSkeleton rows={rowsPerPage} />
                </Stack>
            ) : usersQueryResponse ? (
                <Stack sx={{ mt: 4 }}>
                    <UsersTable 
                        usersQueryResponse={usersQueryResponse}
                        onPageChange={(newPage) => {
                            const next = new URLSearchParams(searchParams);
                            next.set('page', String(newPage + 1));
                            setSearchParams(next, { replace: true });
                        }}
                        onRowsPerPageChange={(newRowsPerPage) => {
                            const next = new URLSearchParams(searchParams);
                            next.set('limit', String(newRowsPerPage));
                            next.set('page', '1');
                            setSearchParams(next, { replace: true });
                        }}
                    />
                </Stack>
            ) : null}
        </Container>
    )
}

export default Users