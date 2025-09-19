import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { ExtendedTheme } from '@avyyx/admin-ui';

import { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Link, useParams, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

import { UserPersonalDetails } from '../../components/UserPersonalDetails';
import { UserSecurity } from '../../components/UserSecurity';
import { UserPageSkeleton } from '../../components/UserPageSkeleton';
import { useUserQuery } from '../../hooks/useUserQuery';
import { USERS_ROUTE } from '../../constants';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    title: string;
}

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

const TabPanel = ({
    title,
    children,
    value,
    index,
    ...other
}: TabPanelProps) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`user-tabpanel-${index}`}
            aria-labelledby={`user-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ py: 6 }}>
                    <Typography variant="body1" mb={4}>
                        {title}
                    </Typography>
                    {children}
                </Box>
            )}
        </div>
    );
};

const User = () => {
    const { state: locationState } = useLocation();
    const { id } = useParams();

    const { breakpoints } = useTheme<ExtendedTheme>();
    const { formatMessage } = useIntl();
    const [value, setValue] = useState(0);
    const isMobile = useMediaQuery(breakpoints.down('sm'));


    const { data: userQueryResponse, isLoading } = useUserQuery(id);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

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
                            <IconButton size="small" component={Link} to={backUrl}>
                                <ChevronLeft />
                            </IconButton>
                        </Tooltip>
                        <Typography variant="h5">
                            {formatMessage(intlMessages.userProfile)}
                        </Typography>
                    </Stack>
                    <Box sx={{ mt: 4 }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            sx={{
                                '& .MuiTabs-flexContainer': { gap: isMobile ? 1 : 3 }
                            }}
                        >
                            <Tab label={formatMessage(intlMessages.profile)} />
                            <Tab label={formatMessage(intlMessages.security)} />
                        </Tabs>
                    </Box>
                    <TabPanel
                        value={value}
                        index={0}
                        title={formatMessage(intlMessages.personalDetails)}
                    >
                        {userQueryResponse && <UserPersonalDetails user={userQueryResponse} />}
                    </TabPanel>
                    <TabPanel
                        value={value}
                        index={1}
                        title={formatMessage(intlMessages.security)}
                    >
                        <UserSecurity />
                    </TabPanel>
                </>
            )}
        </Container>
    );
};

export default User;
