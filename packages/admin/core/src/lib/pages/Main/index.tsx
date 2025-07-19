import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { useErrorBoundary } from '@avyyx/admin-utils';
import { FullPageLoader } from '@avyyx/admin-ui';

import { AppBar } from '../../component/AppBar';
import { useMeQuery } from '../../hooks/useMeQuery';
import { usePermissionsQuery } from '../../hooks/usePermissionsQuery';

const Main = () => {
    const { showError } = useErrorBoundary();
    const { isLoading: isLoadingMe, error: errorMe } = useMeQuery();
    const { isLoading: isLoadingPermissions, error: errorPermissions } =
        usePermissionsQuery();

    useEffect(() => {
        if (errorMe || errorPermissions) {
            showError(errorMe || errorPermissions);
        }
    }, [errorMe, errorPermissions, showError]);

    if (isLoadingMe || isLoadingPermissions) {
        return (
            <FullPageLoader
                showLogo
                loadingText={
                    <FormattedMessage
                        id="main.loading"
                        defaultMessage="Please wait while we load the application..."
                    />
                }
            />
        );
    }

    return (
        <Stack height="100%" flexDirection="column">
            <AppBar />
            <Box height="100%" overflow="auto">
                <Outlet />
            </Box>
        </Stack>
    );
};

export default Main;
