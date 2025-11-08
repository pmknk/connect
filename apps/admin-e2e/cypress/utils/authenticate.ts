type AuthUser = {
    id: string;
    email: string;
    fullName?: string;
    createdAt: string;
    updatedAt: string;
};

type Permission = {
    id: string;
    action: string;
    resource: string;
};

type AuthenticateOptions = {
    user?: Partial<AuthUser>;
    permissions?: Permission[];
};

export const authenticate = (options?: AuthenticateOptions) => {
    // Ensure auth state is present in localStorage (uses custom command defined in support/commands.ts)
    cy.login('test@example.com', 'password');

    const nowIso = new Date().toISOString();
    const user: AuthUser = {
        id: 'user-1',
        email: 'test@example.com',
        fullName: 'Test User',
        createdAt: nowIso,
        updatedAt: nowIso,
        ...options?.user
    };

    // Stub current user
    cy.interceptOk(
        'GET',
        '**/api/v1/identity/auth/me',
        {
            data: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        },
        'getMe'
    );

    const permissions: Permission[] = options?.permissions ?? [
        { id: 'perm-1', action: 'read', resource: 'projects' },
        { id: 'perm-2', action: 'read', resource: 'users' }
    ];

    // Stub permissions
    cy.interceptOk(
        'GET',
        '**/api/v1/identity/permissions',
        {
            data: permissions
        },
        'getPermissions'
    );

    // Load app and wait for initial queries to finish
    cy.visit('/');
    cy.wait(['@getMe', '@getPermissions']);
};
