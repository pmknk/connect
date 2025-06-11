import type { FastifyApplicationInstance } from "@avyyx/server-core";
import { injectable } from "inversify";
import { InitController } from "./init.controller";

@injectable()
export class InitRouter {

    constructor(private readonly initController: InitController) {}

    initialize(fastify: FastifyApplicationInstance) {
        const ROUTE_PATHS = {
            INIT: '/init'
        }

        fastify.post(ROUTE_PATHS.INIT, this.initController.initialize.bind(this.initController));
    }
}