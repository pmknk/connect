import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IntlProvider } from 'react-intl';
import { Provider as ReduxStoreProvider } from 'react-redux';

import { store } from './store/store';

import { AxiosProvider } from './contexts/AxiosContext';
import { Router } from './router';

import { ErrorBoundary } from './components/ErrorBoundary';

import { createPlugin } from './factories/pluginFactory';
import { PluginRegistryProvider } from './contexts/PluginRegistryContext';

type CoreProps = {
    environment: {
        production: boolean;
        api: string;
    };
    plugins?: ReturnType<typeof createPlugin>[];
};

export function Core({ environment, plugins = [] }: CoreProps) {
    const queryClient = new QueryClient();

    return (
        <IntlProvider locale={'en'}>
            <ErrorBoundary fallback={null as any}>
                <AxiosProvider api={environment.api}>
                    <QueryClientProvider client={queryClient}>
                        <ReduxStoreProvider store={store}>
                            <PluginRegistryProvider plugins={plugins}>
                                <Router />
                            </PluginRegistryProvider>
                        </ReduxStoreProvider>
                    </QueryClientProvider>
                </AxiosProvider>
            </ErrorBoundary>
        </IntlProvider>
    );
}

export default Core;
