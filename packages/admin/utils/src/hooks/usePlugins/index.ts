import { useContext } from 'react';
import {
    PluginDefinition,
    PluginsRegistryContext
} from '../../contexts/PluginRegistry';

interface UsePluginsReturn {
    plugins: PluginDefinition[];
    getSlots: () => PluginDefinition['slots'];
    getComponentsBySlot: (slot: string) => PluginDefinition['slots'];
}

/**
 * Custom hook to access and manage plugins from the Redux store
 * @returns {Object} Object containing plugins and utility functions
 * @property {PluginDefinition[]} plugins - Array of all registered plugins
 * @property {Function} getRoutes - Function to get all plugin routes
 * @property {Function} getSlots - Function to get all plugin slots
 * @property {Function} getComponentsBySlot - Function to get all components by slot
 */
export const usePlugins = (): UsePluginsReturn => {
    const { plugins } = useContext(PluginsRegistryContext);

    /**
     * Gets all slots from all registered plugins
     * @returns {PluginDefinition['slots']} Object containing all plugin slots
     */
    const getSlots = (): PluginDefinition['slots'] => {
        return plugins.flatMap((plugin) => plugin.slots ?? []);
    };

    /**
     * Gets all components by slot from all registered plugins
     * @param {string} slot - The slot to get components for
     * @returns {PluginDefinition['slots']} Object containing all components by slot
     */
    const getComponentsBySlot = (slot: string) => {
        return plugins
            .flatMap((plugin) => plugin.slots ?? [])
            .filter(({ slot: s }) => s === slot);
    };

    return {
        plugins,
        getSlots,
        getComponentsBySlot
    };
};
