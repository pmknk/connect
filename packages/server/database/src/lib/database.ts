import { type FastifyApplicationInstance, createPlugin } from "@avyyx/server-core";
import { type Options, Sequelize } from "sequelize";
import { ConnectionService } from './services/connection.service';
import { ModelService } from './services/model.service';
import { DATABASE_CONNECTION_CLIENT_PROVIDER } from './constants';
import { SchemaService } from './services/schema.service';


class DatabasePluginInitializer {
    static async initialize(fastify: FastifyApplicationInstance, options: Options) {
        const sequelize = new Sequelize(options);
        await sequelize.authenticate();

        fastify.di.bind(DATABASE_CONNECTION_CLIENT_PROVIDER).toConstantValue(sequelize);

        fastify.di.bind(SchemaService).toSelf().inSingletonScope();
        fastify.di.bind(ModelService).toSelf().inSingletonScope();
        fastify.di.bind(ConnectionService).toSelf().inSingletonScope();
    }
}

export default createPlugin<Options>(DatabasePluginInitializer.initialize);