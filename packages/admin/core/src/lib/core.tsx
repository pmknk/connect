import { IntlProvider } from 'react-intl';
import { Provider as ReduxStoreProvider } from 'react-redux';
import { Router } from './router';

import { 
    store,
    HttpClientProvider,
    PluginsRegistryProvider,
    ErrorBoundary,
    createPlugin
} from '@avyyx/admin-utils';


type CoreProps = {
    environment: {
        production: boolean;
        api: string;
    };
    plugins?: ReturnType<typeof createPlugin>[];
};

export function Core({ environment, plugins = [] }: CoreProps) {
    return (
        <IntlProvider locale={'en'}>
            <ErrorBoundary
                fallback={() => {
                    return <div>Error</div>;
                }}
            >
                <HttpClientProvider api={environment.api}>
                    <ReduxStoreProvider store={store}>
                        <PluginsRegistryProvider plugins={plugins}>
                            <Router />
                        </PluginsRegistryProvider>
                    </ReduxStoreProvider>
                </HttpClientProvider>
            </ErrorBoundary>
        </IntlProvider>
    );
}

export default Core;
