import { inject, injectable } from "inversify";
import { Sequelize } from "sequelize";
import { DATABASE_CONNECTION_CLIENT_PROVIDER } from "../constants";

/**
 * Service for managing database connections
 */
@injectable()
export class ConnectionService {
    constructor(@inject(DATABASE_CONNECTION_CLIENT_PROVIDER) private readonly sequelize: Sequelize) {}

    /**
     * Gets the current Sequelize instance
     * @returns The Sequelize instance
     */
    get client() {
        return this.sequelize;
    }

    /**
     * Gets the transaction method from the Sequelize instance
     * @returns The transaction method
     */
    get transaction() {
        return this.sequelize.transaction;
    }
}