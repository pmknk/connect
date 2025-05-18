/**
 * Utility object for handling environment variables with type safety
 */
export const envUtil = {
    /**
     * Retrieves a number from environment variables
     * @param key - The environment variable key
     * @param defaultValue - Optional default value if environment variable is not set
     * @returns The parsed number or NaN if not found and no default provided
     */
    number: (key: string, defaultValue?: number): number => 
        process.env[key] ? parseInt(process.env[key]!) : defaultValue || NaN,

    /**
     * Retrieves a string from environment variables
     * @param key - The environment variable key
     * @param defaultValue - Optional default value if environment variable is not set
     * @returns The string value or undefined if not found and no default provided
     */
    string: (key: string, defaultValue?: string): string | undefined => 
        process.env[key] || defaultValue,

    /**
     * Retrieves a boolean from environment variables
     * @param key - The environment variable key
     * @param defaultValue - Optional default value if environment variable is not set
     * @returns The boolean value or false if not found and no default provided
     */
    boolean: (key: string, defaultValue?: boolean): boolean => 
        process.env[key] ? process.env[key] === 'true' : defaultValue || false,

    /**
     * Retrieves an array from environment variables (comma-separated values)
     * @param key - The environment variable key
     * @param defaultValue - Optional default value if environment variable is not set
     * @returns The array of values or empty array if not found and no default provided
     */
    array: (key: string, defaultValue?: any[]): any[] => 
        process.env[key] ? process.env[key]!.split(',') : defaultValue || [],

    /**
     * Retrieves an object from environment variables (JSON string)
     * @param key - The environment variable key
     * @param defaultValue - Optional default value if environment variable is not set
     * @returns The parsed object or empty object if not found and no default provided
     */
    object: (key: string, defaultValue?: object): object => 
        process.env[key] ? JSON.parse(process.env[key]!) : defaultValue || {},

    /**
     * Retrieves any value from environment variables
     * @param key - The environment variable key
     * @param defaultValue - Optional default value if environment variable is not set
     * @returns The value or default if not found
     */
    any: (key: string, defaultValue?: any): any => 
        process.env[key] || defaultValue
}