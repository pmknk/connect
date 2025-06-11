import { ConflictError } from "@avyyx/server-utils";
import { injectable } from "inversify";
import { FastifyReply, FastifyRequest } from "fastify";
import { InitService } from "./init.service";

@injectable()
export class InitController { 
    constructor(private readonly initService: InitService) {}

    async init(request: FastifyRequest, reply: FastifyReply) {
        if (await this.initService.findAdminUser()) {
            throw new ConflictError('Admin user already exists');
        }
        return 'abc'
    }
}