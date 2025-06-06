import fp from 'fastify-plugin';
import { FastifyInstance } from "fastify";
import { Options, Sequelize } from "sequelize";
import { ConnectionService } from './services/connection.service';
import { ModelService } from './services/model.service';
import { DATABASE_CONNECTION_CLIENT_PROVIDER } from './constants';
import { SchemaService } from './services/schema.service';


class DatabasePluginInitializer {
    static async initialize(fastify: FastifyInstance, options: Options) {
        const sequelize = new Sequelize(options);
        await sequelize.authenticate();

        fastify.di.bind(DATABASE_CONNECTION_CLIENT_PROVIDER).toConstantValue(sequelize);
        fastify.di.bind(SchemaService).toSelf();
        fastify.di.bind(ModelService).toSelf();
        fastify.di.bind(ConnectionService).toSelf();
    }
}

export default fp<Options>(DatabasePluginInitializer.initialize);