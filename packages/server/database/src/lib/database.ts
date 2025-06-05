import fp from 'fastify-plugin';
import { FastifyInstance } from "fastify";
import { Options, Sequelize } from "sequelize";
import { ConnectionService } from './services/connection.service';


class DatabasePluginInitializer {
    static async initialize(fastify: FastifyInstance, options: Options) {
        const sequelize = new Sequelize(options);

        const connectionService = new ConnectionService(sequelize);
        await connectionService.connect();

        
    }
}

export default fp<Options>(DatabasePluginInitializer.initialize);