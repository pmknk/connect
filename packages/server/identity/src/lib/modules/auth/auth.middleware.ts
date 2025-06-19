import { FastifyReply, FastifyRequest } from 'fastify';
import { injectable } from 'inversify';

@injectable()
export class AuthMiddleware {
    async authenticate(request: FastifyRequest, reply: FastifyReply) {
        console.log((request as any).config)
    }
}
