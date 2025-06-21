import { renderElement, usePlugins } from '@avyyx/admin-utils';
import { Typography, Navbar, List } from '@material-tailwind/react';
import { SLOTS } from '../../constants';
import { Fragment } from 'react/jsx-runtime';

export const MainNavbar = () => {
    const { getComponentsBySlot } = usePlugins();
    const navbarLeftMenuItems = getComponentsBySlot(SLOTS.NAVBAR_LEFT_MENU_ITEM) ?? [];

    return (
        <Navbar className="mx-auto w-full bg-black dark:bg-surface-dark border-none rounded-none h-14 flex items-center">
            <div className="flex items-center text-white">
                <Typography
                    as="a"
                    href="#"
                    type="small"
                    className="ml-2 mr-2 block py-1 font-semibold"
                >
                    Avyyx Studio
                </Typography>
                <hr className="ml-2 mr-3 h-6 w-px border-l border-t-0 border-surface/25 block dark:border-surface" />
                <List className='flex-row gap-x-4 gap-y-1.5'>
                    {navbarLeftMenuItems.map(({ key, component }) => (
                        <Fragment key={key}>
                            {renderElement(component)}
                        </Fragment>
                    ))}
                </List>
            </div>
        </Navbar>
    );
};
