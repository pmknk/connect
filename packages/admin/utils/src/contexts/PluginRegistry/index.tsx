import { Context, createContext } from 'react';

export type PluginDefinition = {
    name: string;
    routes: {
        path: string;
        component: React.ComponentType;
    }[];
}
export interface PluginsRegistryContextValue {
    plugins: PluginDefinition[];
}

export interface PluginsProviderProps extends PluginsRegistryContextValue {
    children: React.ReactNode;
}

export const PluginsRegistryContext: Context<PluginsRegistryContextValue> =
    createContext({} as PluginsRegistryContextValue);

export const PluginsRegistryProvider = ({
    plugins,
    children
}: PluginsProviderProps) => {
    const value: PluginsRegistryContextValue = {
        plugins
    };

    return (
        <PluginsRegistryContext.Provider value={value}>
            {children}
        </PluginsRegistryContext.Provider>
    );
};
