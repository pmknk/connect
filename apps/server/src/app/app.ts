import createApp from '@connect/server-core';

import identity from '@connect/server-identity';
import database from '@connect/server-database';
import cors from '@fastify/cors';

import { config } from './config';

async function start() {
    const application = createApp();

    await application.register(cors, config.cors);
    await application.register(database, config.database);
    await application.register(identity, config.identity);

    await application.start(config.server);
}

export { start };