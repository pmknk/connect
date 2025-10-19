import { renderElement, usePlugins } from '@connect/admin-utils';
import { ExtendedTheme, AppBarIconButton } from '@connect/admin-ui';

import { useState } from 'react';
import { Fragment } from 'react/jsx-runtime';

import { useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';

import { SLOTS } from '../../constants';
import { Bell, CircleUser, Menu as MenuIcon } from 'lucide-react';
import { IconButton, MenuItem, useMediaQuery } from '@mui/material';
export const AppBar = () => {
    const {palette, breakpoints} = useTheme<ExtendedTheme>()
    const isMobile = useMediaQuery(breakpoints.down('sm'));

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);


    const { getComponentsBySlot } = usePlugins();
    const navbarLeftMenuItems =
        getComponentsBySlot(SLOTS.NAVBAR_LEFT_MENU_ITEM) ?? [];


    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    return (
        <MuiAppBar position="static">
            <Toolbar variant="dense" sx={{
                backgroundColor: palette.slate[900],
                height: 56,
                minHeight: 56,
                justifyContent: 'space-between',
            }}>
                <Stack direction="row" alignItems="center">
                    {isMobile && (
                        <>
                            <IconButton 
                                sx={{
                                    p: 0,
                                    mr: 2,
                                }}
                                onClick={handleMenuClick}
                            >
                                <MenuIcon size={18} color={palette.slate[50]} />
                            </IconButton>

                            <Menu

                                anchorEl={anchorEl}
                                open={open}
                                onClose={() => setAnchorEl(null)}
                                slotProps={{
                                list: {
                                    'aria-labelledby': 'basic-button',
                                },
                                }}
                            >
                                {navbarLeftMenuItems.map(({ key, component }) => (
                                    <Fragment key={key}>
                                        {renderElement(component, { onClick: () => setAnchorEl(null) })}
                                    </Fragment>
                                ))}
                            </Menu>
                        </>
                    )}
                    <Typography variant="body1" color="white" fontWeight={300}>
                        Connect Studio
                    </Typography>
                    {!isMobile && <>
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
                    </>}

                </Stack>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <AppBarIconButton
                        key="bell"
                        icon={<Bell size={18} />}
                        label="Bell"
                        selected={false}
                    />
                    <AppBarIconButton
                        key="profile"
                        icon={<CircleUser size={18} />}
                        label="Profile"
                        selected={false}
                    />
                    </Stack>
            </Toolbar>
        </MuiAppBar>
    )
};
