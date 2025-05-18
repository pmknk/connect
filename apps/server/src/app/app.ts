import { createApp } from '@avyyx/server-core';
import cors from '@fastify/cors';

import { config } from './config';

export const start = async () => {
    const app = createApp()

    app.register(cors, config.cors);

    app.listen(config.server);
}
