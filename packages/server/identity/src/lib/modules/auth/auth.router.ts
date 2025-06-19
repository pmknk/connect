import { injectable } from "inversify";
import { AuthController } from "./auth.controller";
import { FastifyApplicationInstance } from "@avyyx/server-core";

@injectable()
export class AuthRouter {
    constructor(private readonly authController: AuthController) {}

    initialize(fastify: FastifyApplicationInstance) {
        const ROUTE_PATHS = {
            SIGNIN: '/identity/auth/signin'
        }

        fastify.post(
            ROUTE_PATHS.SIGNIN,
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
            this.authController.signin.bind(this.authController)
        )
    }
}