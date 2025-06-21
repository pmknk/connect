export const ACCESS_TOKEN_EXPIRES_IN = 3600 * 1000;
export const REFRESH_TOKEN_EXPIRES_IN = 604800 * 1000;

export const ROLE_CODES = {
    ADMIN: 'admin',
    EDITOR: 'contributor',
    VIEWER: 'viewer'
};

export const IDENTITY_PLUGIN_OPTIONS_DI_PROVIDER = Symbol.for(
    'IDENTITY_PLUGIN_OPTIONS_DI_PROVIDER'
);

export type TOKEN_SCOPE = (typeof TOKEN_SCOPES)[keyof typeof TOKEN_SCOPES];
export const TOKEN_SCOPES = {
    ADMIN_ACCESS: 'admin_access' as const,
    ADMIN_REFRESH: 'admin_refresh' as const
} as const;

