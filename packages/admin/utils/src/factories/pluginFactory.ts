import { FC, LazyExoticComponent } from "react"

export type PluginDefinition = {
    name: string
    routes?: Array<{
        path: string
        component: LazyExoticComponent<FC>
        isPublic?: boolean
        props?: Record<string, object>
    }>
    slots?: Record<string, Array<{
        key: string
        component: LazyExoticComponent<FC>
        props?: Record<string, object>
    }>>
  }

export const createPlugin = (plugin: PluginDefinition) => {
    return plugin;
}