import { FastifyInstance } from "fastify";
import fp from 'fastify-plugin';

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
        console.log('here')
    }
}


export default fp<IdentityPluginOptions>(IdentityPluginInitializer.initialize);
