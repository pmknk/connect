import { IntlProvider } from 'react-intl';
import { Provider as ReduxStoreProvider } from 'react-redux';
import { ThemeProvider } from '@mui/material';

import { 
    store,
    HttpClientProvider,
    PluginsRegistryProvider,
    ErrorBoundary,
    PluginDefinition,
    SnackbarProvider,
} from '@connect/admin-utils';
import { InternalServerError, theme } from '@connect/admin-ui';

import { Router } from './router';

type CoreProps = {
    environment: {
        production: boolean;
        api: string;
    };
    plugins?: PluginDefinition[];
};

export function Core({ environment, plugins = [] }: CoreProps) {
    return (
        <ThemeProvider theme={theme}>
            <IntlProvider locale={'en'}>
                <ErrorBoundary
                    fallback={InternalServerError}
                >
                    <HttpClientProvider api={environment.api}>
                        <ReduxStoreProvider store={store}>
                            <PluginsRegistryProvider plugins={plugins}>
                                <SnackbarProvider>
                                    <Router />
                                </SnackbarProvider>
                            </PluginsRegistryProvider>
                        </ReduxStoreProvider>
                    </HttpClientProvider>
                </ErrorBoundary>
            </IntlProvider>
        </ThemeProvider>
    );
}

export default Core;
