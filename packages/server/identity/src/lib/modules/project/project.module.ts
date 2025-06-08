import { SchemaService } from '@avyyx/server-database';
import { injectable } from 'inversify';
import { ProjectSchema } from './project.schema';

@injectable()
export class ProjectModule {
    constructor(private readonly schemaService: SchemaService) {}

    async initialize() {
        this.schemaService.defineSchema(ProjectSchema);
    }
}
