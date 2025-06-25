import { IntlProvider } from 'react-intl';
import { Provider as ReduxStoreProvider } from 'react-redux';
import { Router } from './router';

import { 
    store,
    HttpClientProvider,
    PluginsRegistryProvider,
    ErrorBoundary,
    PluginDefinition,
} from '@avyyx/admin-utils';
import { InternalServerError } from '@avyyx/admin-ui';

type CoreProps = {
    environment: {
        production: boolean;
        api: string;
    };
    plugins?: PluginDefinition[];
};

export function Core({ environment, plugins = [] }: CoreProps) {
    return (
        <IntlProvider locale={'en'}>
            <ErrorBoundary
                fallback={InternalServerError}
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
