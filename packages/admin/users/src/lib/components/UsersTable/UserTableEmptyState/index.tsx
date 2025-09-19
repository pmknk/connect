import { Stack, useTheme, TableRow, TableCell } from "@mui/material";
import { UserX } from "lucide-react";
import { ExtendedTheme } from "packages/admin/ui/src/lib/types";
import { Typography } from "@mui/material";
import { defineMessages, useIntl } from "react-intl";

const intlMessages = defineMessages({
    title: {
        id: 'users.table.empty.title',
        defaultMessage: 'No users found'
    },
    description: {
        id: 'users.table.empty.description',
        defaultMessage: 'No users found'
    }
});

export const UserTableEmptyState = () => {
    const { palette } = useTheme<ExtendedTheme>();
    const { formatMessage } = useIntl();
    return (
        <TableRow>
            <TableCell colSpan={5} sx={{ py: 6 }}>
                <Stack
                    direction="column"
                    gap={1}
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                >
                    <UserX size={60} color={palette.primary.main} strokeWidth={1} />
                    <Typography variant="h5">{formatMessage(intlMessages.title)}</Typography>
                    <Typography variant="body1" color="text.secondary">
                        {formatMessage(intlMessages.description)}
                    </Typography>
                </Stack>
            </TableCell>
        </TableRow>
    );
};