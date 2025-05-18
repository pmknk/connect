import { FC, LazyExoticComponent } from "react"

export type PluginDefinition<T> = {
    name: string
    routes?: Array<{
        path: string
        component: LazyExoticComponent<FC>
        isPublic?: boolean
        props?: Record<string, T>
    }>
    slots?: Record<string, Array<{
        key: string
        component: LazyExoticComponent<FC>
        props?: Record<string, T>
    }>>
  }

export const createPlugin = <T>(plugin: PluginDefinition<T>) => {
    return plugin;
}