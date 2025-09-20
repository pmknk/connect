import Signin from './lib/signin';

export const signin = () => ({
    name: 'signin',
    route: {
        public: true,
        path: '/signin/*',
        component: Signin
    }
})
