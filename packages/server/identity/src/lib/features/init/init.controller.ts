import { injectable } from "inversify";
import { FastifyReply, FastifyRequest } from "fastify";
import { InitService } from "./init.service";
import { InitAdminUserDto } from "./dtos/init.dto";

@injectable()
export class InitController { 
    constructor(private readonly initService: InitService) {}

    async init(request: FastifyRequest, reply: FastifyReply) {
        return await this.initService.createAdminUser(request.body as InitAdminUserDto);
    }
}