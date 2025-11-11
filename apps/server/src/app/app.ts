import createApp from '@content/server-core';

import identity from '@content/server-identity';
import database from '@content/server-database';
import cors from '@fastify/cors';
import contentLibrary from '@content/server-content-library';

import { config } from './config';

async function start() {
    const application = createApp();

    await application.register(cors, config.cors);
    await application.register(database, config.database);
    await application.register(identity, config.identity);
    await application.register(contentLibrary, config.contentLibrary);
    application.fastifyInstance.addHook('onRequest', async (request, reply) => {
        await new Promise((resolve) => setTimeout(resolve, 200));
    });

    await application.start(config.server);
}

export { start };
