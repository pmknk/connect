import { injectable } from "inversify";
import { ConnectionService } from "./connection.service";

import type { BelongsToManyOptions, BelongsToOptions, HasManyOptions, HasOneOptions, Model, ModelAttributes, ModelCtor, ModelOptions } from "sequelize";

/**
 * Defines a relationship between two models
 */
export type RelationDefinition = {
    type: 'hasOne' | 'hasMany' | 'belongsTo' | 'belongsToMany';
    target: string;
    options: HasOneOptions | HasManyOptions | BelongsToOptions | BelongsToManyOptions;
};

/**
 * Service for managing Sequelize models and their relationships
 */ 
@injectable()
export class ModelService {
    constructor(private readonly connectionService: ConnectionService) {}

    /**
     * Defines a new model in the database
     * @param name - The name of the model
     * @param attributes - The attributes/columns of the model
     * @param options - Additional model options
     */
    defineModel(name: string, attributes: ModelAttributes, options: ModelOptions) {
        this.connectionService.client.define(name, attributes, options);
    }

    /**
     * Defines a relationship between two models
     * @param sourceModel - The source model to create the relationship from
     * @param targetModel - The target model to create the relationship to
     * @param relation - The relationship definition
     * @throws Error if the relation type is not supported
     */
    async defineRelations(
        sourceModel: ModelCtor<Model>,
        targetModel: ModelCtor<Model>,
        relation: RelationDefinition
    ) {
        const relationMap = {
            hasOne: (model: ModelCtor<Model>, target: ModelCtor<Model>, opts: HasOneOptions) => 
                model.hasOne(target, opts),
            hasMany: (model: ModelCtor<Model>, target: ModelCtor<Model>, opts: HasManyOptions) => 
                model.hasMany(target, opts),
            belongsTo: (model: ModelCtor<Model>, target: ModelCtor<Model>, opts: BelongsToOptions) => 
                model.belongsTo(target, opts),
            belongsToMany: (model: ModelCtor<Model>, target: ModelCtor<Model>, opts: BelongsToManyOptions) => 
                model.belongsToMany(target, opts)
        };

        const relationFn = relationMap[relation.type];
        if (!relationFn) {
            throw new Error(`Unsupported relation type: ${relation.type}`);
        }

        relationFn(sourceModel, targetModel, relation.options as any);
    }

    /**
     * Gets a model by name
     * @param name - The name of the model
     * @returns The model
     */
    getModel(name: string): ModelCtor<Model> {
        return this.connectionService.client.models[name] as ModelCtor<Model>;
    }
}