import React, { createContext, useMemo } from 'react'
import { PluginDefinition } from '../../factories/pluginFactory'

type PluginRegistryValue = {
    plugins: PluginDefinition<any>[]
    routes: PluginDefinition<any>['routes']
    slots: PluginDefinition<any>['slots']
}

type Props = {
    plugins: PluginDefinition<any>[]
    children: React.ReactNode
}


export const PluginRegistryContext = createContext<PluginRegistryValue | undefined>(undefined)
export function PluginRegistryProvider({ plugins, children }: Props) {
    const routes = useMemo(() => plugins.flatMap(p => p.routes ?? []), [plugins])
    const slots = useMemo(() => {
        const result: Record<string, any[]> = {}
        for (const p of plugins) {
            for (const [slotName, components] of Object.entries(p.slots || {})) {
                result[slotName] = [...(result[slotName] || []), ...components]
            }
        }
        return result
    }, [plugins])

  return (
    <PluginRegistryContext.Provider value={{ plugins, routes, slots }}>
      {children}
    </PluginRegistryContext.Provider>
  )
}
