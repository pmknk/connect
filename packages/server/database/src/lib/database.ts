import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { type Options as DatabasePluginOptions, Sequelize } from 'sequelize';

export default fp(async (fastify: FastifyInstance, config: DatabasePluginOptions) => {
    try {
        const sequelize = new Sequelize({
            logging: fastify.log.info.bind(fastify.log),
            ...config,
    });
    await sequelize.authenticate();

    fastify.decorate('db', sequelize);

    fastify.addHook('onClose', async () => {
        await sequelize.close();
    });
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
})
