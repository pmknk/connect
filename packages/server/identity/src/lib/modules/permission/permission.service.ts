import { injectable } from 'inversify';
import { PermissionRepository } from './permission.repository';
import { Permission } from './permission.schema';

/**
 * Service for managing permissions
 */
@injectable()
export class PermissionService {
    /**
     * Creates an instance of PermissionService
     * @param permissionRepository - Repository for permission operations
     */
    constructor(private readonly permissionRepository: PermissionRepository) {}

    /**
     * Finds permissions for a specific user by their ID
     * @param userId - The unique identifier of the user
     * @returns Promise resolving to an array of permissions without role information
     */
    async findByUserId(userId: string): Promise<Permission[]> {
        return await this.permissionRepository.findByUserId(userId);
    }
}
