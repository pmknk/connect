import {
    type FastifyApplicationInstance,
    createPlugin
} from '@content/server-core';
import {
    ConnectionService,
    SchemaRegistryService
} from '@content/server-database';

import initializeDataSeed from './seeds/initialization-data';

import { IDENTITY_PLUGIN_OPTIONS_DI_PROVIDER } from './constants';
import type { IdentityPluginOptions } from './types';
// Roles
import { RoleController } from './controllers/role.controller';
import { RoleRouter } from './routes/role.router';
import { RoleSchema } from './schemas/role.schema';
import { RoleService } from './services/role.service';

// Permission Groups
import { PermissionGroupSchema } from './schemas/permission-group.schema';

// Init
import { InitController } from './controllers/init.controller';
import { InitService } from './services/init.service';
import { InitRouter } from './routes/init.router';

// User
import { UserRouter } from './routes/user.router';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { User, UserSchema } from './schemas/user.schema';

// Project Users
import { ProjectUsersSchema } from './schemas/project-users.schema';

// User Roles
import { UserRolesSchema } from './schemas/user-roles.schema';

// Permission
import { PermissionSchema } from './schemas/permission.schema';
import { PermissionRouter } from './routes/permission.router';
import { PermissionController } from './controllers/permission.controller';
import { PermissionService } from './services/permission.service';

// Invite
import { InviteSchema } from './schemas/invite.schema';
import { InviteService } from './services/invite.service';
import { InviteRouter } from './routes/invite.router';
import { InviteController } from './controllers/invite.controller';
import { ProjectSchema } from './schemas/project.schema';

// Project
import { ProjectService } from './services/project.service';
import { ProjectRouter } from './routes/project.router';
import { ProjectController } from './controllers/project.controller';

// Auth
import { AuthController } from './controllers/auth.controller';
import { AuthRouter } from './routes/auth.router';
import { AuthService } from './services/auth.service';
import { SigninService } from './services/signin.service';
import { JwtService } from './services/jwt.service';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { FastifyRequest } from 'fastify';

class IdentityPluginInitializer {
    /**
     * Registers the Identity Plugin with the provided Fastify instance and options.
     *
     * @param {FastifyInstance} fastify - The Fastify instance to register the plugin with.
     */
    static async initialize(
        fastify: FastifyApplicationInstance,
        options: IdentityPluginOptions
    ): Promise<void> {
        fastify.di
            .bind(IDENTITY_PLUGIN_OPTIONS_DI_PROVIDER)
            .toConstantValue(options);

        const schemaService = fastify.di.get(SchemaRegistryService);

        schemaService.defineSchema(RoleSchema);
        schemaService.defineSchema(PermissionGroupSchema);
        schemaService.defineSchema(ProjectUsersSchema);
        schemaService.defineSchema(UserSchema);
        schemaService.defineSchema(UserRolesSchema);
        schemaService.defineSchema(PermissionSchema);
        schemaService.defineSchema(ProjectSchema);
        schemaService.defineSchema(InviteSchema);

        await schemaService.sync();

        fastify.di.bind(AuthRouter).toSelf();
        fastify.di.bind(AuthController).toSelf();
        fastify.di.bind(AuthService).toSelf();
        fastify.di.bind(JwtService).toSelf();
        fastify.di.bind(SigninService).toSelf();
        fastify.di.bind(AuthMiddleware).toSelf();
        fastify.di.get(AuthRouter).initialize(fastify);

        fastify.di.bind(RoleController).toSelf();
        fastify.di.bind(RoleRouter).toSelf();
        fastify.di.bind(RoleService).toSelf();
        fastify.di.get(RoleRouter).initialize(fastify);

        fastify.di.bind(UserRouter).toSelf();
        fastify.di.bind(UserController).toSelf();
        fastify.di.bind(UserService).toSelf();
        fastify.di.get(UserRouter).initialize(fastify);

        fastify.di.bind(PermissionController).toSelf();
        fastify.di.bind(PermissionRouter).toSelf();
        fastify.di.bind(PermissionService).toSelf();
        fastify.di.get(PermissionRouter).initialize(fastify);

        fastify.di.bind(InitRouter).toSelf();
        fastify.di.bind(InitController).toSelf();
        fastify.di.bind(InitService).toSelf();
        fastify.di.get(InitRouter).initialize(fastify);

        fastify.di.bind(InviteService).toSelf();
        fastify.di.bind(InviteController).toSelf();
        fastify.di.bind(InviteRouter).toSelf();
        fastify.di.get(InviteRouter).initialize(fastify);

        fastify.di.bind(ProjectService).toSelf();
        fastify.di.bind(ProjectController).toSelf();
        fastify.di.bind(ProjectRouter).toSelf();
        fastify.di.get(ProjectRouter).initialize(fastify);

        fastify.addHook('onListen', async () => {
            const connection = fastify.di.get(ConnectionService).client;
            await initializeDataSeed.up(connection);
        });

        fastify.addHook('preHandler', async (request, reply) => {
            await fastify.di
                .get(AuthMiddleware)
                .authenticate(
                    request as FastifyRequest & { user: User | null }
                );
        });
    }
}

export default createPlugin<IdentityPluginOptions>(
    IdentityPluginInitializer.initialize
);
