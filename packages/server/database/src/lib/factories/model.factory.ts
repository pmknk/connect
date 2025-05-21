import { DataTypes, Model, Sequelize } from "sequelize";

export type FieldType = 'text' | 'boolean' | 'number' | 'date'

export interface ContentField {
    name: string
    type: FieldType
    required?: boolean
}

export interface ModelSchema {
    name: string
    tableName: string
    slug: string
    fields: ContentField[]
    options?: Record<string, any>
}

export const defineModel = (sequelize: Sequelize, schema: ModelSchema): typeof Model => {
    const attributes: any = {}
    
    for (const field of schema.fields) {
        attributes[field.name] = {
            type: mapToSequelizeType(field.type),
            allowNull: !field.required,
        }
    }
    
    return sequelize.define(schema.name, attributes, {
        ...schema.options,
        tableName: schema.tableName,
    }) as typeof Model
}

const mapToSequelizeType = (type: string) => {
    switch (type) {
        case 'text': return DataTypes.TEXT
        case 'boolean': return DataTypes.BOOLEAN
        case 'number': return DataTypes.INTEGER
        case 'date': return DataTypes.DATE
        default: return DataTypes.STRING
    }
}

export class ModelRegistry {
    private models = new Map<string, typeof Model>()
    
    constructor(private sequelize: Sequelize) {}
    
    register(schema: ModelSchema) {
        const model = defineModel(this.sequelize, schema)
        this.models.set(schema.name, model)
    }
    
    getModel(name: string): typeof Model {
        const model = this.models.get(name)
        if (!model) throw new Error(`Model "${name}" not registered`)
        return model
    }
    
    getAllModels() {
        return Array.from(this.models.entries())
    }
}