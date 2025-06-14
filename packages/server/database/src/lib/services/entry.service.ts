import { injectable } from "inversify";
import { ModelService } from "./model.service";
import { CreateOnePayload, FindOnePayload } from "../types";

@injectable()
export class EntryService {
    constructor(private readonly modelService: ModelService) {}
    
    async findOne<T>(payload: FindOnePayload<T>) {
        const model = this.modelService.getModel(payload.schema);
        return (await model.findOne(payload))?.toJSON() as T | null;
    }

    async createOne<T>(payload: CreateOnePayload<T>) {
        const model = this.modelService.getModel(payload.schema);
        return (await model.create(payload.values, payload))?.toJSON() as T;
    }
}