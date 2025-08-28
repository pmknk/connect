import { EntryService, Transaction } from "@avyyx/server-database";
import { injectable } from "inversify";
import { Invite } from "./invite.schema";

/**
 * Repository class for handling invite-related database operations.
 */
@injectable()
export class InviteRepository {
    /**
     * Creates an instance of InviteRepository.
     * @param entryService - Service for database entry operations.
     */
    constructor(private readonly entryService: EntryService) {}

    /**
     * Creates a new invite in the database.
     * @param dto - The invite data to create, excluding system fields and including userId.
     * @param transaction - The database transaction to use.
     * @returns {Promise<Invite>} The created invite.
     */
    async create(
        dto: Omit<Invite, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'user'> & { userId: string },
        transaction: Transaction
    ): Promise<Invite> {
        return await this.entryService.create<Invite & { userId: string }>({
            schema: 'Invites',
            values: dto,
            transaction
        });
    }
}