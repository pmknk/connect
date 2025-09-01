import { injectable } from "inversify";
import { RoleRepository } from "./role.repository";
import { Role } from "./role.schema";

/**
 * Service for handling business logic related to roles.
 */
@injectable()
export class RoleService {
    /**
     * Creates an instance of RoleService.
     * @param roleRepository - The repository used to interact with role data.
     */
    constructor(private readonly roleRepository: RoleRepository) {}

    /**
     * Retrieves all roles from the repository.
     * @returns A promise that resolves to an array of Role entities.
     */
    async getRoles(): Promise<Role[]> {
        return await this.roleRepository.findAll();
    }
}