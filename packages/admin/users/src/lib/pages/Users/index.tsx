import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Container from "@mui/material/Container"
import { ExtendedTheme } from "@avyyx/admin-ui";
import { FormattedMessage } from "react-intl";
import { UsersTable } from "../../components/UsersTable";
import { useUsersQuery } from "../../hooks/useUsersQuery";

const Users = () => {
    const { breakpoints } = useTheme<ExtendedTheme>();
    const isMobile = useMediaQuery(breakpoints.down('sm'));

    const { data: usersQueryResponse } = useUsersQuery()

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
            {usersQueryResponse && (
                <Stack sx={{ mt: 4 }}>
                    <UsersTable 
                        usersQueryResponse={usersQueryResponse}
                        onPageChange={() => {
                            console.log('page');
                        }}
                        onRowsPerPageChange={() => {
                            console.log('rowsPerPage');
                        }}
                    />
                </Stack>
            )}
        </Container>
    )
}

export default Users