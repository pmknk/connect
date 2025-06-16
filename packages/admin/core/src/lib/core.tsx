import { IntlProvider } from 'react-intl';
import { Provider as ReduxStoreProvider } from 'react-redux';
import { Router } from './router';

import { store } from './store/store';
import { HttpClientProvider } from './contexts/HttpClientProvider';
import { ErrorBoundary } from './components/ErrorBoundary';
import { createPlugin } from './factories/pluginFactory';

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
            <ErrorBoundary fallback={null as any}>
                <HttpClientProvider api={environment.api}>
                    <ReduxStoreProvider store={store}>
                        <Router />
                    </ReduxStoreProvider>
                </HttpClientProvider>
            </ErrorBoundary>
        </IntlProvider>
    );
}

export default Core;
