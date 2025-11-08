import { DataTypes } from 'sequelize';
import type { SchemaDataType } from '../types';

/**
 * Converts a schema data type to its corresponding Sequelize DataType
 * @param type - The schema data type to convert
 * @param extra - Additional options for certain types (e.g. values for ENUM)
 * @returns The corresponding Sequelize DataType
 * @throws Error if type is not supported or if ENUM values are missing
 */
export const resolveSequelizeType = (type: SchemaDataType, extra?: any) => {
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
};
