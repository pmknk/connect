import { injectable } from 'inversify';
import { type FastifyApplicationInstance } from '../../types';

@injectable()
export class StartupHooksService {
    private readonly beforeStartHooks: ((app: FastifyApplicationInstance) => Promise<void>)[] = [];
    private readonly afterStartHooks: ((app: FastifyApplicationInstance) => Promise<void>)[] = [];

    async registerHook(hook: 'beforeStart' | 'afterStart', callback: (app: FastifyApplicationInstance) => Promise<void>) {
        if (hook === 'beforeStart') {
            this.beforeStartHooks.push(callback);
        } else if (hook === 'afterStart') {
            this.afterStartHooks.push(callback);
        }
    }

    async executeBeforeStartHooks(app: FastifyApplicationInstance) {
        for (const hook of this.beforeStartHooks) {
            await hook(app);
        }
    }

    async executeAfterStartHooks(app: FastifyApplicationInstance) {
        for (const hook of this.afterStartHooks) {
            await hook(app);
        }
    }
} 