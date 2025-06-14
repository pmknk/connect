import { SchemaRegistryService } from '@avyyx/server-database';
import { injectable } from 'inversify';
import { ProjectSchema } from './project.schema';

@injectable()
export class ProjectModule {
    constructor(private readonly schemaRegistryService: SchemaRegistryService) {}

    async initialize() {
        this.schemaRegistryService.defineSchema(ProjectSchema);
    }
}
