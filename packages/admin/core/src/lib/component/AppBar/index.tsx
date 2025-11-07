import { renderElement, usePlugins } from '@content/admin-utils';
import { ExtendedTheme, AppBarIconButton } from '@content/admin-ui';

import { Fragment, useState } from 'react';
import { Bell, CircleUser, Menu as MenuIcon } from 'lucide-react';

import { useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import { useMediaQuery } from '@mui/material';


import { CORE_SLOTS } from '../../constants';
export const AppBar = () => {
    const {palette, breakpoints} = useTheme<ExtendedTheme>()
    const isMobile = useMediaQuery(breakpoints.down('sm'));

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);


    const { getComponentsBySlot } = usePlugins();
    const navbarLeftMenuItems =
        getComponentsBySlot(CORE_SLOTS.CORE_NAVBAR_LEFT_MENU_ITEM) ?? [];

    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    return (
        <MuiAppBar position="static" sx={{
            zIndex: 1
        }}>
            <Toolbar variant="dense" sx={{
                background: `linear-gradient(135deg, ${palette.slate[900]} 0%, ${palette.slate[900]} 85%, #7c2d12 100%)`,
                height: 56,
                minHeight: 56,
                justifyContent: 'space-between',
                px: isMobile ? 3 : 2,
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
                        Content Studio
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
