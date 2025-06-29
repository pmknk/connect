// import { CircleUser, Bell } from 'lucide-react';
// import { MainMenuIconItem } from '@avyyx/admin-ui';
import { renderElement, usePlugins } from '@avyyx/admin-utils';
import { ExtendedTheme, MainMenuIconItem } from '@avyyx/admin-ui';

import { Fragment } from 'react/jsx-runtime';

import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import { SLOTS } from '../../constants';
import { Bell, CircleUser } from 'lucide-react';

export const MainNavbar = () => {
    const {palette} = useTheme<ExtendedTheme>()
    const { getComponentsBySlot } = usePlugins();
    const navbarLeftMenuItems =
        getComponentsBySlot(SLOTS.NAVBAR_LEFT_MENU_ITEM) ?? [];

    return (
        <AppBar position="static">
            <Toolbar variant="dense" sx={{
                backgroundColor: palette.slate[900],
                height: 56,
                minHeight: 56,
                justifyContent: 'space-between',
            }}>
                <Stack direction="row" alignItems="center">
                    <Typography variant="body1" color="white" fontWeight={300}>
                        Avyyx Studio
                    </Typography>
                    <Divider orientation='vertical' sx={{
                        mx: 2.4,
                        height: 24,
                        borderColor: palette.slate[500],
                    }} />
                    <Stack direction="row" spacing={2}>
                        {navbarLeftMenuItems.map(({ key, component }) => (
                            <Fragment key={key}>
                                {renderElement(component)}
                            </Fragment>
                        ))}
                    </Stack>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <MainMenuIconItem
                        key="bell"
                        icon={<Bell size={18} />}
                        label="Bell"
                        selected={false}
                    />
                    <MainMenuIconItem
                        key="profile"
                        icon={<CircleUser size={18} />}
                        label="Profile"
                        selected={false}
                    />
                    </Stack>
            </Toolbar>
        </AppBar>
    )
        
    // return (
    //     <Navbar className="mx-auto w-full bg-gray-900 dark:bg-surface-dark border-none rounded-none h-14 flex items-center justify-between">
    //         <div className="flex items-center text-white">
    //             <Typography as="a" href="/" className="ml-2 mr-2 block py-1">
    //                 Avyyx Studio
    //             </Typography>
    //             <hr className="ml-2 mr-3 h-6 w-px border-l border-t-0 border-surface/25 block dark:border-surface" />
    //             <List className="flex-row gap-x-4 gap-y-1.5">
    //                 {navbarLeftMenuItems.map(({ key, component }) => (
    //                     <Fragment key={key}>
    //                         {renderElement(component)}
    //                     </Fragment>
    //                 ))}
    //             </List>
    //         </div>
    //         <div className="flex items-center gap-x-4 mr-2">
                // <MainMenuIconItem
                //     key="bell"
                //     icon={<Bell size={18} />}
                //     label="Bell"
                //     selected={false}
                // />
                // <MainMenuIconItem
                //     key="profile"
                //     icon={<CircleUser size={18} />}
                //     label="Profile"
                //     selected={false}
                // />
    //         </div>
    //     </Navbar>
    // );
};
