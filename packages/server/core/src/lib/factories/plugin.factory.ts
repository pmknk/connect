import fp from 'fastify-plugin';
import { FastifyApplicationInstance } from '../../types';

/**
 * Creates a Fastify plugin from an initializer function.
 * 
 * @template T - The type of value returned by the initializer function
 * @param {function} initializer - The async function that initializes the plugin
 * @param {FastifyApplicationInstance} initializer.fastify - The Fastify instance with dependency injection container
 * @returns {Promise<T>} The initialized plugin
 * 
 * @example
 * const myPlugin = createPlugin(async (fastify) => {
 *   // Plugin initialization logic
 *   return { /* plugin data *\/ };
 * });
 */
export const createPlugin = <T>(initializer: (fastify: FastifyApplicationInstance, options: T) => Promise<void>) => {
    return fp(initializer as any);
}