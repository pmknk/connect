import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { ExtendedTheme } from '@connect/admin-ui';

import { defineMessages, useIntl } from 'react-intl';
import { Link, useParams, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

import { useUserQuery } from '../../hooks/useUserQuery';

import { UserPersonalDetails } from '../../components/UserPersonalDetails';
import { UserSecurityDetails } from '../../components/UserSecurityDetails';
import { UserPageSkeleton } from '../../components/UserPageSkeleton';

import {
    USERS_ROUTE,
    USER_TAB_PROFILE,
    USER_TAB_SECURITY
} from '../../constants';
import { Tabs } from '@connect/admin-ui';

const intlMessages = defineMessages({
    userProfile: {
        id: 'user.profile',
        defaultMessage: 'User Profile'
    },
    profile: {
        id: 'user.profile',
        defaultMessage: 'Profile'
    },
    security: {
        id: 'user.security',
        defaultMessage: 'Security'
    },
    personalDetails: {
        id: 'user.personalDetails',
        defaultMessage: 'Personal Details'
    },
    back: {
        id: 'user.back',
        defaultMessage: 'Back to users'
    }
});

const User = () => {
    const { state: locationState } = useLocation();
    const { id } = useParams();

    const { breakpoints } = useTheme<ExtendedTheme>();
    const { formatMessage } = useIntl();
    const isMobile = useMediaQuery(breakpoints.down('sm'));

    const { data: userQueryResponse, isLoading } = useUserQuery(id);

    const backUrl = locationState?.backUrl || USERS_ROUTE;

    return (
        <Container
            maxWidth={'md'}
            sx={{
                my: isMobile ? 3 : 4,
                pb: isMobile ? 8 : 0
            }}
        >
            {isLoading ? (
                <UserPageSkeleton />
            ) : (
                <>
                    <Stack direction="row" alignItems="center" gap={0.5}>
                        <Tooltip title={formatMessage(intlMessages.back)}>
                            <IconButton
                                size="small"
                                component={Link}
                                to={backUrl}
                            >
                                <ChevronLeft />
                            </IconButton>
                        </Tooltip>
                        <Typography variant="h5">
                            {formatMessage(intlMessages.userProfile)}
                        </Typography>
                    </Stack>
                    <Tabs
                        paramName="tab"
                        defaultValue={USER_TAB_PROFILE}
                        items={[
                            {
                                label: formatMessage(intlMessages.profile),
                                value: USER_TAB_PROFILE,
                                panelTitle: formatMessage(
                                    intlMessages.personalDetails
                                ),
                                content: userQueryResponse ? (
                                    <UserPersonalDetails
                                        user={userQueryResponse}
                                    />
                                ) : null
                            },
                            {
                                label: formatMessage(intlMessages.security),
                                value: USER_TAB_SECURITY,
                                panelTitle: formatMessage(
                                    intlMessages.security
                                ),
                                content: userQueryResponse ? (
                                    <UserSecurityDetails
                                        user={userQueryResponse}
                                    />
                                ) : null
                            }
                        ]}
                    />
                </>
            )}
        </Container>
    );
};

export default User;
