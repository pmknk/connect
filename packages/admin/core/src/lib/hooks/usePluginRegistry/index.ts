import { useContext } from 'react'
import { PluginRegistryContext } from '../../contexts/PluginRegistryContext'

export function usePluginRegistry() {
    const ctx = useContext(PluginRegistryContext)
    if (!ctx) throw new Error('usePluginRegistry must be used within PluginRegistryProvider')
    return ctx
}
