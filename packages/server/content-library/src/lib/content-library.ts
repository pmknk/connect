import {
    type FastifyApplicationInstance,
    createPlugin
} from '@content/server-core';
import {
    SchemaDefinition,
    SchemaRegistryService
} from '@content/server-database';
import { SchemaController } from './controllers/schema.controller';
import { SchemaRouter } from './routes/schema.router';
import { prepareSchemas } from './utils/schema-utils';
type ContentLibraryPluginOptions = {
    schemas: SchemaDefinition[];
};

class ContentLibraryPluginInitializer {
    static async initialize(
        fastify: FastifyApplicationInstance,
        { schemas }: ContentLibraryPluginOptions
    ) {
        const schemaService = fastify.di.get(SchemaRegistryService);

        const projectSchema = schemaService
            .getSchemas()
            .find((schema) => schema.name === 'Projects');
        prepareSchemas(schemas, projectSchema);
        for (const schema of schemas) schemaService.defineSchema(schema);
        await schemaService.sync();

        fastify.di.bind(SchemaController).toSelf();
        fastify.di.bind(SchemaRouter).toSelf();
        fastify.di.get(SchemaRouter).initialize(fastify);
    }
}

export default createPlugin<ContentLibraryPluginOptions>(
    ContentLibraryPluginInitializer.initialize
);
