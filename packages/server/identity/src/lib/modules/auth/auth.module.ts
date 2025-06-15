import { FastifyApplicationInstance } from '@avyyx/server-core';
import { JwtService } from './services/jwt.service';
import { SigninService } from './services/signin.service';

export class AuthModule {
    async initialize(fastify: FastifyApplicationInstance) {
        fastify.di.bind(JwtService).toSelf();
        fastify.di.bind(SigninService).toSelf();
    }
}
