import { injectable } from 'inversify';
import { ModelService } from './model.service';
import type {
    BulkCreatePayload,
    CountPayload,
    CreateOnePayload,
    FindOnePayload,
    FindPayload
} from '../types';

/**
 * Service for handling database entry operations
 * Provides methods to find, create, and manage database entries
 */
@injectable()
export class EntryService {
    /**
     * Creates a new EntryService instance
     * @param modelService - Service for managing database models
     */
    constructor(private readonly modelService: ModelService) {}

    /**
     * Finds a single entry in the database
     * @template T - The type of the entry to find
     * @param payload - Configuration object containing schema and find options
     * @returns Promise resolving to the found entry as T, or null if not found
     */
    async findOne<T>(payload: FindOnePayload<T>) {
        const model = this.modelService.getModel(payload.schema);
        return (await model.findOne(payload))?.toJSON() as T | null;
    }

    /**
     * Finds multiple entries in the database
     * @template T - The type of the entries to find
     * @param payload - Configuration object containing schema and find options
     * @returns Promise resolving to an array of found entries as T[]
     */
    async find<T>(payload: FindPayload<T>) {
        const model = this.modelService.getModel(payload.schema);
        return (await model.findAll(payload))?.map((item) =>
            item.toJSON()
        ) as T[];
    }

    /**
     * Counts the number of entries in the database
     * @template T - The type of the entries to count
     * @param payload - Configuration object containing schema and count options
     * @returns Promise resolving to the number of entries
     */
    async count<T>(payload: CountPayload<T>) {
        const model = this.modelService.getModel(payload.schema);
        return await model.count(payload);
    }

    /**
     * Creates a new entry in the database
     * @template T - The type of the entry to create
     * @param payload - Configuration object containing schema, create options, and values
     * @returns Promise resolving to the created entry as T
     */
    async create<T>(payload: CreateOnePayload<T>) {
        const model = this.modelService.getModel(payload.schema);
        return (await model.create(payload.values, payload))?.toJSON() as T;
    }

    /**
     * Creates multiple entries in the database
     * @template T - The type of the entries to create
     * @param payload - Configuration object containing schema, create options, and values
     * @returns Promise resolving to an array of created entries as T[]
     */
    async bulkCreate<T>(payload: BulkCreatePayload<T>) {
        const model = this.modelService.getModel(payload.schema);
        return (await model.bulkCreate(payload.values, payload))?.map((item) =>
            item.toJSON()
        ) as T[];
    }
}
