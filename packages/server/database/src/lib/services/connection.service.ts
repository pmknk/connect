import { Sequelize } from "sequelize";

/**
 * Service for managing database connections
 */
export class ConnectionService {
    /** Sequelize instance */
    private readonly sequelize: Sequelize;

    /**
     * Creates a new ConnectionService instance
     * @param sequelize - The Sequelize instance to use
     */
    constructor(sequelize: Sequelize) {
        this.sequelize = sequelize;
    }

    /**
     * Establishes a connection to the database
     * @returns Promise that resolves when the connection is established
     */
    async connect() {
        await this.sequelize.authenticate();
    }

    /**
     * Closes the database connection
     * @returns Promise that resolves when the connection is closed
     */
    async disconnect() {
        await this.sequelize.close();
    }

    /**
     * Gets the current Sequelize instance
     * @returns The Sequelize instance
     */
    get connection() {
        return this.sequelize;
    }
}