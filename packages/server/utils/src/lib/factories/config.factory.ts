import { config } from "dotenv";

export class Env {
    private readonly env: NodeJS.ProcessEnv;

    constructor() {
        config();
        this.env = process.env;
    }

    /**
     * Retrieves an environment variable as a number.
     * @param key - The environment variable key.
     * @param defaultValue - The default value if the variable is not set.
     */
        number(key: string, defaultValue?: number): number {
            return this.env[key]
                ? parseInt(this.env[key]!)
                : defaultValue || NaN;
        }
    
        /**
         * Retrieves an environment variable as a string.
         * @param key - The environment variable key.
         * @param defaultValue - The default value if the variable is not set.
         */
        string(key: string, defaultValue?: string): string | undefined {
            return this.env[key] || defaultValue;
        }
    
        /**
         * Retrieves an environment variable as a boolean.
         * @param key - The environment variable key.
         * @param defaultValue - The default value if the variable is not set.
         */
        boolean(key: string, defaultValue?: boolean): boolean {
            return this.env[key]
                ? this.env[key] === 'true'
                : defaultValue || false;
        }
    
        /**
         * Retrieves an environment variable as an array.
         * @param key - The environment variable key.
         * @param defaultValue - The default value if the variable is not set.
         */
        array(key: string, defaultValue?: any[]): any[] {
            return this.env[key]
                ? this.env[key]!.split(',')
                : defaultValue || [];
        }
    
        /**
         * Retrieves an environment variable as an object.
         * @param key - The environment variable key.
         * @param defaultValue - The default value if the variable is not set.
         */
        object(key: string, defaultValue?: object): object {
            return this.env[key]
                ? JSON.parse(this.env[key]!)
                : defaultValue || {};
        }
    
        /**
         * Retrieves an environment variable in any format.
         * @param key - The environment variable key.
         * @param defaultValue - The default value if the variable is not set.
         */
        any(key: string, defaultValue?: any): any {
            return this.env[key] || defaultValue;
        }
}

/**
 * Creates a configuration object using the provided callback function.
 * @param callback - The callback function that returns the configuration object.
 * @returns The configuration object.
 */
export const createConfig = <T>(callback: (env: Env) => T) => {
    return callback(new Env());
}