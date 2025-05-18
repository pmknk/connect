export const envUtil = {
    number: (key: string, defaultValue?: number): number => 
        process.env[key] ? parseInt(process.env[key]!) : defaultValue || NaN,

    string: (key: string, defaultValue?: string): string | undefined => 
        process.env[key] || defaultValue,

    boolean: (key: string, defaultValue?: boolean): boolean => 
        process.env[key] ? process.env[key] === 'true' : defaultValue || false,

    array: (key: string, defaultValue?: any[]): any[] => 
        process.env[key] ? process.env[key]!.split(',') : defaultValue || [],

    object: (key: string, defaultValue?: object): object => 
        process.env[key] ? JSON.parse(process.env[key]!) : defaultValue || {},

    any: (key: string, defaultValue?: any): any => 
        process.env[key] || defaultValue
}