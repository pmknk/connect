import { ComponentType, Context, createContext, ReactNode } from 'react';

export type SlotComponent = {
    key: string;
    slot: string;
    component: ReactNode | ComponentType
    props?: Record<string, any>;
};

export type RouteDefinition = {
    public?: boolean;
    path: string;
    component: React.ComponentType;
    props?: Record<string, any>;
};

export type PluginDefinition = {
    name: string;
    slots?: SlotComponent[];
};
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
