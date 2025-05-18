import { createConfig } from "@avyyx/server-core";
import { Dialect } from "sequelize";

export const config = createConfig((env) => {
    return {
        database: {
            dialect: 'postgres' as Dialect,
            host: env.string('SERVER_DATABASE_HOST', 'localhost'),
            port: env.number('SERVER_DATABASE_PORT', 5432),
            username: env.string('SERVER_DATABASE_USERNAME', 'postgres'),
            password: env.string('SERVER_DATABASE_PASSWORD', 'postgres'),
            database: env.string('SERVER_DATABASE_NAME', 'postgres')
        },
        identity: {
            jwtSecret: env.string('SERVER_IDENTITY_JWT_SECRET', 'secret'),
            admin: {
                fullName: env.string('SERVER_IDENTITY_ADMIN_FULLNAME'),
                email: env.string('SERVER_IDENTITY_ADMIN_EMAIL'),
                password: env.string('SERVER_IDENTITY_ADMIN_PASSWORD')
            }
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
    }
})