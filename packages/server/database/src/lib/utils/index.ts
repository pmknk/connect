import { DataTypes } from "sequelize";
import { DataType } from "../types";

export const resolveSequelizeType = (type: DataType, extra?: any) => {
    switch (type.toLowerCase()) {
        case 'string':
            return DataTypes.STRING;
        case 'text':
            return DataTypes.TEXT;
        case 'enum':
            if (!extra?.values) throw new Error('ENUM requires `values`');
            return DataTypes.ENUM(...extra.values);
        case 'uuid':
            return DataTypes.UUID;
        case 'date':
            return DataTypes.DATEONLY;
        case 'time':
            return DataTypes.TIME;
        case 'datetime':
        case 'timestamp':
            return DataTypes.DATE;
        case 'integer':
            return DataTypes.INTEGER;
        case 'biginteger':
            return DataTypes.BIGINT;
        case 'float':
            return DataTypes.FLOAT;
        case 'decimal':
            return DataTypes.DECIMAL;
        case 'boolean':
            return DataTypes.BOOLEAN;
        case 'json':
            return DataTypes.JSON;
        default:
            throw new Error(`Unsupported type: ${type}`);
    }
}