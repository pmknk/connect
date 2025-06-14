import { injectable } from 'inversify';
import { type FastifyApplicationInstance } from '../../types';

/**
 * Service responsible for managing application startup hooks.
 * Allows registration and execution of hooks that run before and after the application starts.
 */
@injectable()
export class StartupHooksService {
    private readonly beforeStartHooks: ((app: FastifyApplicationInstance) => Promise<void>)[] = [];
    private readonly afterStartHooks: ((app: FastifyApplicationInstance) => Promise<void>)[] = [];

    /**
     * Registers a new hook to be executed during application startup
     * @param hook - The timing of the hook execution ('beforeStart' or 'afterStart')
     * @param callback - The async function to be executed, receiving the Fastify application instance
     */
    async registerHook(hook: 'beforeApplicationStart' | 'afterApplicationStart', callback: (app: FastifyApplicationInstance) => Promise<void>) {
        if (hook === 'beforeApplicationStart') {
            this.beforeStartHooks.push(callback);
        } else if (hook === 'afterApplicationStart') {
            this.afterStartHooks.push(callback);
        }
    }

    /**
     * Executes all registered hooks that should run before application start
     * @param app - The Fastify application instance
     */
    async executeBeforeStartHooks(app: FastifyApplicationInstance) {
        for (const hook of this.beforeStartHooks) {
            await hook(app);
        }
    }

    /**
     * Executes all registered hooks that should run after application start
     * @param app - The Fastify application instance
     */
    async executeAfterStartHooks(app: FastifyApplicationInstance) {
        for (const hook of this.afterStartHooks) {
            await hook(app);
        }
    }
}