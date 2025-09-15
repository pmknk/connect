import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";


import { ExtendedTheme } from "@avyyx/admin-ui";

import { useState } from "react";
import { defineMessages, useIntl } from "react-intl";
import { UserPersonalDetails } from "../../components/UserPersonalDetails";
import { UserSecurity } from "../../components/UserSecurity";

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
    }
});

const TabPanel = ({ title, children, value, index, ...other }: TabPanelProps) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`user-tabpanel-${index}`}
            aria-labelledby={`user-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ py: 6 }}>
                <Typography variant="body1" mb={4}>
                    {title}
                </Typography>
                {children}
            </Box>}
        </div>
    );
  }

const User = () => {
    const { breakpoints } = useTheme<ExtendedTheme>();
    const { formatMessage } = useIntl();
    const [value, setValue] = useState(0);
    const isMobile = useMediaQuery(breakpoints.down('sm'));

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Container 
            maxWidth={'md'}
            sx={{
                my: isMobile ? 3 : 4,
                pb: isMobile ? 8 : 0
            }}
        >
            <Typography variant="h5">
                {formatMessage(intlMessages.userProfile)}
            </Typography>
            <Box sx={{ mt: 4 }}>
                <Tabs value={value} onChange={handleChange} sx={{ "& .MuiTabs-flexContainer": { gap: isMobile ? 1 : 3 } }}>
                    <Tab label={formatMessage(intlMessages.profile)} />
                    <Tab label={formatMessage(intlMessages.security)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0} title={formatMessage(intlMessages.personalDetails)}>
                <UserPersonalDetails />
            </TabPanel>
            <TabPanel value={value} index={1} title={formatMessage(intlMessages.security)}>
                <UserSecurity />
            </TabPanel>
        </Container>
    )
};

export default User;