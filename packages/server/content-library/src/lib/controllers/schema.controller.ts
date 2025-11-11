import { injectable } from 'inversify';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { SchemaRegistryService } from '@content/server-database';
import {
    type GetSchemasResponseDto,
    toGetSchemasResponseDto
} from '../dtos/get-schemas.dto';

@injectable()
export class SchemaController {
    constructor(
        private readonly schemaRegistryService: SchemaRegistryService
    ) {}

    async getSchemas(
        _request: FastifyRequest,
        reply: FastifyReply
    ): Promise<GetSchemasResponseDto> {
        const schemas = this.schemaRegistryService.getSchemas();
        return reply.status(200).send(toGetSchemasResponseDto(schemas));
    }
}


