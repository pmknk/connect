import { BelongsToManyOptions, BelongsToOptions, DataTypes, HasManyOptions, HasOneOptions, ModelAttributes, ModelOptions, Model, Sequelize, ModelCtor } from "sequelize";
import { resolveSequelizeType } from "../utils";
import type { ModelDefinition, RelationDefinition } from "../types";

interface RegisteredModel {
    name: string;
    attributes: ModelAttributes;
    options: ModelOptions;
    relations: RelationDefinition[];
}

/**
 * Service for managing database models and their relationships
 */
export class DatabaseService {
    private readonly models: RegisteredModel[] = [];

    constructor(private readonly databaseConnection: Sequelize) {}

    /**
     * Get a registered model by name
     * @param name The name of the model to retrieve
     * @returns The registered model or undefined if not found
     */
    getModel(name: string): RegisteredModel | undefined {
        return this.models.find(model => model.name === name);
    }

    /**
     * Register a new model definition
     * @param def The model definition to register
     * @throws Error if model with the same name already exists
     */
    registerModel(def: ModelDefinition): void {
        if (this.getModel(def.name)) {
            throw new Error(`Model with name "${def.name}" is already registered`);
        }

        const attributes = this.buildModelAttributes(def);
        const indexes = this.buildModelIndexes(def);

        this.models.push({
            name: def.name,
            attributes,
            options: {
                ...def.options,
                indexes
            },
            relations: def.relations ?? []
        });
    }

    /**
     * Synchronize all registered models with the database
     * @param options Optional sync options
     */
    async sync(options: { alter?: boolean; force?: boolean } = { alter: true }): Promise<void> {
        try {
            this.defineModels();
            this.defineRelations();

            await this.databaseConnection.sync(options);
        } catch (error) {
            throw new Error(`Failed to sync database: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    private buildModelAttributes(def: ModelDefinition): ModelAttributes {
        const attributes: ModelAttributes = {};

        for (const [name, field] of Object.entries(def.fields)) {
            const type = resolveSequelizeType(field.type, field);
            
            attributes[name] = {
                type,
                allowNull: field.allowNull ?? true,
                primaryKey: field.primaryKey ?? false,
                unique: field.unique ?? false,
                ...(field.defaultValue !== undefined && {
                    defaultValue: this.resolveDefaultValue(field.defaultValue)
                })
            };
        }

        return attributes;
    }

    private buildModelIndexes(def: ModelDefinition): { unique: boolean; fields: string[] }[] {
        const indexes: { unique: boolean; fields: string[] }[] = [];

        for (const [name, field] of Object.entries(def.fields)) {
            if (field.unique) {
                indexes.push({ unique: true, fields: [name] });
            }
        }

        return indexes;
    }

    private resolveDefaultValue(defaultValue: any): any {
        if (typeof defaultValue === 'string' && defaultValue in DataTypes) {
            return DataTypes[defaultValue as keyof typeof DataTypes];
        }
        return defaultValue;
    }

    private defineModels(): void {
        for (const model of this.models) {
            if (!this.databaseConnection.isDefined(model.name)) {
                this.databaseConnection.define(model.name, model.attributes, model.options);
            }
        }
    }

    private defineRelations(): void {
        for (const model of this.models) {
            this.setupModelRelations(model);
        }
    }

    private setupModelRelations(model: RegisteredModel): void {
        const relations = model.relations || [];
        const sourceModel = this.databaseConnection.models[model.name] as ModelCtor<Model>;

        if (!sourceModel) {
            throw new Error(`Source model "${model.name}" not found`);
        }

        for (const relation of relations) {
            const targetModel = this.databaseConnection.models[relation.target] as ModelCtor<Model>;
            
            if (!targetModel) {
                throw new Error(`Target model "${relation.target}" not found for relation in "${model.name}"`);
            }

            this.createRelation(sourceModel, targetModel, relation);
        }
    }

    private createRelation(
        sourceModel: ModelCtor<Model>,
        targetModel: ModelCtor<Model>,
        relation: RelationDefinition
    ): void {
        switch (relation.type) {
            case 'hasOne':
                sourceModel.hasOne(targetModel, relation.options as HasOneOptions);
                break;
            case 'hasMany':
                sourceModel.hasMany(targetModel, relation.options as HasManyOptions);
                break;
            case 'belongsTo':
                sourceModel.belongsTo(targetModel, relation.options as BelongsToOptions);
                break;
            case 'belongsToMany':
                sourceModel.belongsToMany(targetModel, relation.options as BelongsToManyOptions);
                break;
            default:
                throw new Error(`Unsupported relation type: ${relation.type}`);
        }
    }
}