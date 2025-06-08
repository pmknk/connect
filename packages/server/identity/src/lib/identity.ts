import { type FastifyApplicationInstance, createPlugin } from "@avyyx/server-core";
import { UserModule } from "./modules/user/user.module";
import { RoleModule } from "./modules/role/role.module";
import { PermissionModule } from "./modules/permission/permission.module";
import { PermissionGroupModule } from "./modules/permission-group/permission-group.module";
import { ProjectModule } from "./modules/project/project.module";

type IdentityPluginOptions = {
    jwtSecret: string;
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
        fastify.di.bind(PermissionModule).toSelf();
        fastify.di.bind(PermissionGroupModule).toSelf();
        fastify.di.bind(ProjectModule).toSelf();

        fastify.di.get(UserModule).initialize();
        fastify.di.get(RoleModule).initialize();
        fastify.di.get(PermissionModule).initialize();
        fastify.di.get(PermissionGroupModule).initialize();
        fastify.di.get(ProjectModule).initialize();
    }
}


export default createPlugin<IdentityPluginOptions>(IdentityPluginInitializer.initialize);
