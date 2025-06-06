import { FastifyInstance } from "fastify";
import fp from 'fastify-plugin';
import { UserModule } from "./modules/user/user.module";
import { RoleModule } from "./modules/role/role.module";

type IdentityPluginOptions = {
    jwtSecret: string;
    admin?: {
        fullName: string;
        email: string;
        password: string;
    };
};

class IdentityPluginInitializer {

    /**
     * Registers the Identity Plugin with the provided Fastify instance and options.
     *
     * @param {FastifyInstance} fastify - The Fastify instance to register the plugin with.
     */
    static async initialize(fastify: FastifyInstance, options: IdentityPluginOptions): Promise<void> {
        fastify.di.bind(UserModule).toSelf();
        fastify.di.bind(RoleModule).toSelf();
    }
}


export default fp<IdentityPluginOptions>(IdentityPluginInitializer.initialize);
