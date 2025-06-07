import { type FastifyApplicationInstance, createPlugin } from "@avyyx/server-core";
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
    static async initialize(fastify: FastifyApplicationInstance, options: IdentityPluginOptions): Promise<void> {
        fastify.di.bind(UserModule).toSelf();
        fastify.di.bind(RoleModule).toSelf();

        const userModule = fastify.di.get(UserModule);
        const roleModule = fastify.di.get(RoleModule);

        await userModule.initialize();
        await roleModule.initialize();
    }
}


export default createPlugin<IdentityPluginOptions>(IdentityPluginInitializer.initialize);
