import Signin from './lib/signin';

const CORE_PUBLIC_ROUTES_SLOT_NAME = 'corePublicRoutes';
const CORE_PUBLIC_ROUTES_SLOT_KEY = 'signinPublicRoutes';

export const signin = () => ({
    name: 'signin',
    slots: [
        {
            key: CORE_PUBLIC_ROUTES_SLOT_KEY,
            slot: CORE_PUBLIC_ROUTES_SLOT_NAME,
            component: Signin
        }
    ]
});
