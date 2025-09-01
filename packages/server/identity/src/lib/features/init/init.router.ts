import type { FastifyApplicationInstance } from "@avyyx/server-core";
import { injectable } from "inversify";
import { InitController } from "./init.controller";

@injectable()
export class InitRouter {

    constructor(private readonly initController: InitController) {}

    initialize(fastify: FastifyApplicationInstance) {
        const ROUTE_PATHS = {
            INIT: '/api/v1/identity/init'
        }

        fastify.post(
            ROUTE_PATHS.INIT,
            {
                schema: {
                    body: {
                        type: 'object',
                        required: ['email', 'password'],
                        properties: {
                            email: { type: 'string', format: 'email' },
                            password: { type: 'string', minLength: 8 }
                        }
                    }
                },
                config: {
                    auth: false
                }
            },
            this.initController.init.bind(this.initController));
    }
}