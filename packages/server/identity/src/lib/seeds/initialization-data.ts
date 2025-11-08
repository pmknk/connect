import { Sequelize } from 'sequelize';
import { v4 } from 'uuid';

const initializeDataSeed = {
    up: async (sequelize: Sequelize) => {
        try {
            const [existingGeneralGroup] = await sequelize.query(`
                SELECT "id" FROM "PermissionGroups" WHERE "slug" = 'general'
            `);

            let generalPermissionGroupId;
            if (existingGeneralGroup.length === 0) {
                generalPermissionGroupId = v4();
                await sequelize.query(`
                    INSERT INTO "PermissionGroups" ("id", "name", "slug", "description", "createdAt", "updatedAt")
                    VALUES (
                        '${generalPermissionGroupId}',
                        'General',
                        'general',
                        'General permissions for the application',
                        NOW(),
                        NOW()
                    )
                `);
            } else {
                generalPermissionGroupId = (existingGeneralGroup[0] as any).id;
            }

            const permissions = [
                { action: 'create', resource: 'admin:user' },
                { action: 'read', resource: 'admin:user' },
                { action: 'update', resource: 'admin:user' },
                { action: 'delete', resource: 'admin:user' },
                { action: 'create', resource: 'admin:role' },
                { action: 'read', resource: 'admin:role' },
                { action: 'update', resource: 'admin:role' },
                { action: 'delete', resource: 'admin:role' },
                { action: 'create', resource: 'admin:project' },
                { action: 'read', resource: 'admin:project' },
                { action: 'update', resource: 'admin:project' },
                { action: 'delete', resource: 'admin:project' }
            ];

            // Create permissions if they don't exist
            for (const { action, resource } of permissions) {
                const [existingPermission] = await sequelize.query(`
                    SELECT "id" FROM "Permissions" 
                    WHERE "action" = '${action}' 
                    AND "resource" = '${resource}'
                    AND "permissionGroupId" = '${generalPermissionGroupId}'
                `);

                if (existingPermission.length === 0) {
                    await sequelize.query(`
                        INSERT INTO "Permissions" ("id", "action", "resource", "permissionGroupId", "createdAt", "updatedAt")
                        VALUES (
                            gen_random_uuid(),
                            '${action}',
                            '${resource}',
                            '${generalPermissionGroupId}',
                            NOW(),
                            NOW()
                        )
                    `);
                }
            }

            // Check if admin role exists
            const [existingAdminRole] = await sequelize.query(`
                SELECT "id" FROM "Roles" WHERE "slug" = 'admin'
            `);

            let adminRoleId;
            if (existingAdminRole.length === 0) {
                adminRoleId = v4();
                await sequelize.query(`
                    INSERT INTO "Roles" ("id", "name", "slug", "description", "createdAt", "updatedAt")
                    VALUES (
                        '${adminRoleId}',
                        'Administrator',
                        'admin',
                        'Can manage the entire organization, including its members, projects, and configuration',
                        NOW(),
                        NOW()
                    )
                `);
            } else {
                adminRoleId = (existingAdminRole[0] as any).id;
            }

            // Check if contributor role exists
            const [existingContributorRole] = await sequelize.query(`
                SELECT "id" FROM "Roles" WHERE "slug" = 'contributor'
            `);

            let contributorRoleId;
            if (existingContributorRole.length === 0) {
                contributorRoleId = v4();
                await sequelize.query(`
                    INSERT INTO "Roles" ("id", "name", "slug", "description", "createdAt", "updatedAt")
                    VALUES (
                        '${contributorRoleId}',
                        'Contributor',
                        'contributor',
                        'Can create, edit, and maintain content within a project',
                        NOW(),
                        NOW()
                    )
                `);
            } else {
                contributorRoleId = (existingContributorRole[0] as any).id;
            }

            // Check if viewer role exists
            const [existingViewerRole] = await sequelize.query(`
                SELECT "id" FROM "Roles" WHERE "slug" = 'viewer'
            `);

            let viewerRoleId;
            if (existingViewerRole.length === 0) {
                viewerRoleId = v4();
                await sequelize.query(`
                    INSERT INTO "Roles" ("id", "name", "slug", "description", "createdAt", "updatedAt")
                    VALUES (
                        '${viewerRoleId}',
                        'Viewer',
                        'viewer',
                        'Can view content within a project but cannot create or edit content',
                        NOW(),
                        NOW()
                    )
                `);
            } else {
                viewerRoleId = (existingViewerRole[0] as any).id;
            }

            for (const { action, resource } of permissions) {
                const [permission] = await sequelize.query(`
                    SELECT "id" FROM "Permissions" 
                    WHERE "action" = '${action}' 
                    AND "resource" = '${resource}'
                    AND "permissionGroupId" = '${generalPermissionGroupId}'
                `);

                if (permission.length > 0) {
                    const [existingRolePermission] = await sequelize.query(`
                        SELECT "roleId" FROM "RolePermissions" 
                        WHERE "roleId" = '${adminRoleId}' 
                        AND "permissionId" = '${(permission[0] as any).id}'
                    `);

                    if (existingRolePermission.length === 0) {
                        await sequelize.query(`
                            INSERT INTO "RolePermissions" ("createdAt", "updatedAt", "roleId", "permissionId")
                            VALUES (
                                NOW(),
                                NOW(),
                                '${adminRoleId}',
                                '${(permission[0] as any).id}'
                            )
                        `);
                    }
                }
            }
        } catch (error) {
            console.error('Error initializing data seed:', error);
            throw error;
        }
    },
    down: async (sequelize: Sequelize) => {}
};

export default initializeDataSeed;
