import { type FastifyApplicationInstance, createPlugin } from "@avyyx/server-core";
import { type Options, Sequelize } from "sequelize";
import { ConnectionService } from './services/connection.service';
import { ModelService } from './services/model.service';
import { DATABASE_CONNECTION_CLIENT_PROVIDER } from './constants';
import { SchemaService } from './services/schema.service';

/**
 * Initializes the database plugin for the application
 */
class DatabasePluginInitializer {
    /**
     * Initializes the database connection and registers required services
     * @param fastify - The Fastify application instance
     * @param options - Sequelize database connection options
     */
    static async initialize(fastify: FastifyApplicationInstance, options: Options) {
        const sequelize = new Sequelize({
            logging: false,
            ...options,
        });
        await sequelize.authenticate();

        fastify.di.bind(DATABASE_CONNECTION_CLIENT_PROVIDER).toConstantValue(sequelize);

        fastify.di.bind(SchemaService).toSelf().inSingletonScope();
        fastify.di.bind(ModelService).toSelf().inSingletonScope();
        fastify.di.bind(ConnectionService).toSelf().inSingletonScope();
    }
}

export default createPlugin<Options>(DatabasePluginInitializer.initialize);