import { useContext } from "react";
import { PluginDefinition, PluginsRegistryContext } from "../../contexts/PluginRegistry";

interface UsePluginsReturn {
    plugins: PluginDefinition[];
    getRoutes: () => PluginDefinition['routes'];
    getSlots: () => PluginDefinition['slots'];
    getPluginsByRoute: (route: string) => PluginDefinition[];
    getPluginsBySlot: (slot: string) => PluginDefinition[];
}

/**
 * Custom hook to access and manage plugins from the Redux store
 * @returns {Object} Object containing plugins and utility functions
 * @property {PluginDefinition[]} plugins - Array of all registered plugins
 * @property {Function} getRoutes - Function to get all plugin routes
 * @property {Function} getSlots - Function to get all plugin slots
 * @property {Function} getPluginsByRoute - Function to get plugins by route path
 * @property {Function} getPluginsBySlot - Function to get plugins by slot name
 */
export const usePlugins = (): UsePluginsReturn => {
    const { plugins } = useContext(PluginsRegistryContext);
    /**
     * Gets all routes from all registered plugins
     * @returns {PluginDefinition['routes']} Array of all plugin routes
     */
    const getRoutes = (): PluginDefinition['routes'] => {
        return plugins.flatMap(plugin => plugin.routes ?? []);
    }

    /**
     * Gets all slots from all registered plugins
     * @returns {PluginDefinition['slots']} Object containing all plugin slots
     */
    const getSlots = (): PluginDefinition['slots'] => {
        const result: Record<string, any[]> = {}
        for (const p of plugins) {
            for (const [slotName, components] of Object.entries(p.slots || {})) {
                result[slotName] = [...(result[slotName] || []), ...components]
            }
        }
        return result
    }
    
    /**
     * Gets plugins that have a specific route
     * @param {string} route - The route path to filter by
     * @returns {PluginDefinition[]} Array of plugins that have the specified route
     */
    const getPluginsByRoute = (route: string) => {
        return plugins.filter(plugin => plugin.routes?.some(r => r.path === route));
    }

    /**
     * Gets plugins that have a specific slot
     * @param {string} slot - The slot name to filter by
     * @returns {PluginDefinition[]} Array of plugins that have the specified slot
     */
    const getPluginsBySlot = (slot: string) => {
        return plugins.filter(plugin => plugin.slots?.[slot]);
    }

    return {
        plugins,
        getRoutes,
        getSlots,
        getPluginsByRoute,
        getPluginsBySlot
    };
}