import { createApp } from '@avyyx/server-core';
import identity from '@avyyx/server-identity';
import database from '@avyyx/server-database';

import cors from '@fastify/cors';

import { config } from './config';

export const start = async () => {
    const app = createApp()
    
    app.register(cors, config.cors);
    app.register(database, config.database);
    app.register(identity, config.identity);

    app.listen(config.server);
}
