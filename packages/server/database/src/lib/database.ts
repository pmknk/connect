import {
    type FastifyApplicationInstance,
    createPlugin
} from '@connect/server-core';
import { type Options, Sequelize } from 'sequelize';
import { DATABASE_CONNECTION_CLIENT_PROVIDER } from './constants';

import { ConnectionService } from './services/connection.service';
import { ModelService } from './services/model.service';
import { SchemaRegistryService } from './services/schema-registry.service';
import { EntryService } from './services/entry.service';

/**
 * Initializes the database plugin for the application
 */
class DatabasePluginInitializer {
    /**
     * Initializes the database connection and registers required services
     * @param fastify - The Fastify application instance
     * @param options - Sequelize database connection options
     */
    static async initialize(
        fastify: FastifyApplicationInstance,
        options: Options
    ) {
        const sequelize = new Sequelize({
            logging: false,
            ...options
        });

        fastify.di
            .bind(DATABASE_CONNECTION_CLIENT_PROVIDER)
            .toConstantValue(sequelize);

        fastify.di.bind(SchemaRegistryService).toSelf().inSingletonScope();
        fastify.di.bind(ModelService).toSelf().inSingletonScope();
        fastify.di.bind(ConnectionService).toSelf().inSingletonScope();
        fastify.di.bind(EntryService).toSelf().inSingletonScope();

        const schemaRegistryService = fastify.di.get(SchemaRegistryService);

        fastify.addHook('onListen', async () => {
            await sequelize.authenticate();
            await schemaRegistryService.sync();
        });
    }
}

export default createPlugin<Options>(DatabasePluginInitializer.initialize);
