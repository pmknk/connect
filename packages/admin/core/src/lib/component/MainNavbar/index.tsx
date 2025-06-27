import { CircleUser, Bell } from 'lucide-react';
import { MainMenuIconItem } from '@avyyx/admin-ui';
import { renderElement, usePlugins } from '@avyyx/admin-utils';
import { Typography, Navbar, List } from '@material-tailwind/react';
import { Fragment } from 'react/jsx-runtime';
import { SLOTS } from '../../constants';

export const MainNavbar = () => {
    const { getComponentsBySlot } = usePlugins();
    const navbarLeftMenuItems =
        getComponentsBySlot(SLOTS.NAVBAR_LEFT_MENU_ITEM) ?? [];

    return (
        <Navbar className="mx-auto w-full bg-gray-900 dark:bg-surface-dark border-none rounded-none h-14 flex items-center justify-between">
            <div className="flex items-center text-white">
                <Typography as="a" href="/" className="ml-2 mr-2 block py-1">
                    Avyyx Studio
                </Typography>
                <hr className="ml-2 mr-3 h-6 w-px border-l border-t-0 border-surface/25 block dark:border-surface" />
                <List className="flex-row gap-x-4 gap-y-1.5">
                    {navbarLeftMenuItems.map(({ key, component }) => (
                        <Fragment key={key}>
                            {renderElement(component)}
                        </Fragment>
                    ))}
                </List>
            </div>
            <div className="flex items-center gap-x-4 mr-2">
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
            </div>
        </Navbar>
    );
};
