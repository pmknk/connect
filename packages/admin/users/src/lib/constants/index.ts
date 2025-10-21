export const ROWS_PER_USERS_PAGE_OPTIONS = [5, 10, 20, 50, 100];

export const USERS_ROUTE = '/users';
export const JOIN_ROUTE = '/signin/join';

// User page tab query param values
export const USER_TAB_PROFILE = 'profile';
export const USER_TAB_SECURITY = 'security';

// User danger zone action identifiers
export const USER_ACTION_ACTIVATE = 'activate' as const;
export const USER_ACTION_DEACTIVATE = 'deactivate' as const;
export const USER_ACTION_CANCEL_INVITATION = 'cancelInvitation' as const;

export type UserDangerAction =
    | typeof USER_ACTION_ACTIVATE
    | typeof USER_ACTION_DEACTIVATE
    | typeof USER_ACTION_CANCEL_INVITATION;