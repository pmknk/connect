import {
    type FastifyApplicationInstance,
    createPlugin
} from '@avyyx/server-core';
import { ConnectionService } from '@avyyx/server-database';

import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';
import { PermissionGroupModule } from './modules/permission-group/permission-group.module';
import { ProjectModule } from './modules/project/project.module';
import { InitModule } from './modules/init/init.module';
import initializeDataSeed from './seeds/initialization-data';
import { IDENTITY_PLUGIN_OPTIONS_DI_PROVIDER } from './constants';
import { IdentityPluginOptions } from './types';
import { AuthModule } from './modules/auth/auth.module';

class IdentityPluginInitializer {
    /**
     * Registers the Identity Plugin with the provided Fastify instance and options.
     *
     * @param {FastifyInstance} fastify - The Fastify instance to register the plugin with.
     */
    static async initialize(
        fastify: FastifyApplicationInstance,
        options: IdentityPluginOptions
    ): Promise<void> {
        fastify.di
            .bind(IDENTITY_PLUGIN_OPTIONS_DI_PROVIDER)
            .toConstantValue(options);

        fastify.di.bind(UserModule).toSelf();
        fastify.di.bind(RoleModule).toSelf();
        fastify.di.bind(PermissionModule).toSelf();
        fastify.di.bind(PermissionGroupModule).toSelf();
        fastify.di.bind(ProjectModule).toSelf();
        fastify.di.bind(InitModule).toSelf();
        fastify.di.bind(AuthModule).toSelf();

        fastify.di.get(UserModule).initialize(fastify);
        fastify.di.get(RoleModule).initialize(fastify);
        fastify.di.get(InitModule).initialize(fastify);
        fastify.di.get(AuthModule).initialize(fastify);
        fastify.di.get(PermissionModule).initialize(fastify);
        
        fastify.di.get(PermissionGroupModule).initialize();
        fastify.di.get(ProjectModule).initialize();

        fastify.addHook('onListen', async () => {
            const connection = fastify.di.get(ConnectionService).client;
            await initializeDataSeed.up(connection);
        });
    }
}

export default createPlugin<IdentityPluginOptions>(
    IdentityPluginInitializer.initialize
);
