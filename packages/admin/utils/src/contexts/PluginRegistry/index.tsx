import { ComponentType, Context, createContext, ReactNode } from 'react';

export type SlotComponent = {
    key: string;
    slot: string;
    component: ReactNode | ComponentType;
};

export type RouteDefinition = {
    public?: boolean;
    path: string;
    component: React.ComponentType;
    props?: any;
};

export type PluginDefinition = {
    name: string;
    route?: RouteDefinition;
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
