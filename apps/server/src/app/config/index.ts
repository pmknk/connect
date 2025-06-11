import { createConfig } from "@avyyx/server-utils";
import { Dialect } from "sequelize";

export const config = createConfig((env) => ({
    database: {
        dialect: env.string('SERVER_DATABASE_DIALECT', 'postgres') as Dialect,
        host: env.string('SERVER_DATABASE_HOST', 'localhost'),
        port: env.number('SERVER_DATABASE_PORT', 5432),
        username: env.string('SERVER_DATABASE_USERNAME', 'postgres'),
        password: env.string('SERVER_DATABASE_PASSWORD', 'postgres'),
        database: env.string('SERVER_DATABASE_NAME', 'postgres')
    },
    identity: {
        jwtSecret: env.string('SERVER_IDENTITY_JWT_SECRET') ?? 'default-jwt-secret-please-change-in-production',
    },
    server: {
        port: env.number('SERVER_PORT', 4000)
    },
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: '*',
        credentials: true
    }
}))