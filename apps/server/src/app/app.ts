import createApp from '@avyyx/server-core';

import identity from '@avyyx/server-identity';
import database from '@avyyx/server-database';
import cors from '@fastify/cors';

import { config } from './config';

    function start() {
        const application = createApp();

        application.register(cors, config.cors);
        application.register(database, config.database);
        application.register(identity, config.identity);
        
        application.listen(config.server);
        
}

export { start };