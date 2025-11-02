/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        interface Chainable<Subject> {
            login(email: string, password: string): void;
            interceptWith(
                method: string,
                url: string | RegExp,
                options?: {
                    alias?: string;
                    statusCode?: number;
                    body?: unknown;
                    headers?: Record<string, string>;
                    delayMs?: number;
                }
            ): Chainable<any>;
            interceptOk(
                method: string,
                url: string | RegExp,
                body?: unknown,
                alias?: string
            ): Chainable<any>;
            interceptCreated(
                method: string,
                url: string | RegExp,
                body?: unknown,
                alias?: string
            ): Chainable<any>;
            interceptUnauthorized(
                method: string,
                url: string | RegExp,
                body?: unknown,
                alias?: string
            ): Chainable<any>;
            interceptForbidden(
                method: string,
                url: string | RegExp,
                body?: unknown,
                alias?: string
            ): Chainable<any>;
            interceptNotFound(
                method: string,
                url: string | RegExp,
                body?: unknown,
                alias?: string
            ): Chainable<any>;
            interceptServerError(
                method: string,
                url: string | RegExp,
                body?: unknown,
                alias?: string
            ): Chainable<any>;
        }
    }
}

// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
    console.log('Custom command example: Login', email, password);
});

Cypress.Commands.add(
    'interceptWith',
    (
        method: string,
        url: string | RegExp,
        options?: {
            alias?: string;
            statusCode?: number;
            body?: unknown;
            headers?: Record<string, string>;
            delayMs?: number;
        }
    ) => {
        const {
            alias,
            statusCode = 200,
            body,
            headers,
            delayMs
        } = options || {};
        const routeHandler = (req: any) => {
            req.reply({ statusCode, body, headers, delay: delayMs });
        };
        const chainable = cy.intercept(
            method as any,
            url as any,
            routeHandler as any
        );
        if (alias) {
            return chainable.as(alias);
        }
        return chainable;
    }
);

Cypress.Commands.add(
    'interceptOk',
    (method: string, url: string | RegExp, body?: unknown, alias?: string) => {
        const chainable = cy.intercept(method as any, url as any, {
            statusCode: 200,
            body
        });
        return alias ? chainable.as(alias) : chainable;
    }
);

Cypress.Commands.add(
    'interceptCreated',
    (method: string, url: string | RegExp, body?: unknown, alias?: string) => {
        const chainable = cy.intercept(method as any, url as any, {
            statusCode: 201,
            body
        });
        return alias ? chainable.as(alias) : chainable;
    }
);

Cypress.Commands.add(
    'interceptUnauthorized',
    (method: string, url: string | RegExp, body?: unknown, alias?: string) => {
        const responseBody = body ?? { message: 'Unauthorized' };
        const chainable = cy.intercept(method as any, url as any, {
            statusCode: 401,
            body: responseBody
        });
        return alias ? chainable.as(alias) : chainable;
    }
);

Cypress.Commands.add(
    'interceptForbidden',
    (method: string, url: string | RegExp, body?: unknown, alias?: string) => {
        const responseBody = body ?? { message: 'Forbidden' };
        const chainable = cy.intercept(method as any, url as any, {
            statusCode: 403,
            body: responseBody
        });
        return alias ? chainable.as(alias) : chainable;
    }
);

Cypress.Commands.add(
    'interceptNotFound',
    (method: string, url: string | RegExp, body?: unknown, alias?: string) => {
        const responseBody = body ?? { message: 'Not Found' };
        const chainable = cy.intercept(method as any, url as any, {
            statusCode: 404,
            body: responseBody
        });
        return alias ? chainable.as(alias) : chainable;
    }
);

Cypress.Commands.add(
    'interceptServerError',
    (method: string, url: string | RegExp, body?: unknown, alias?: string) => {
        const responseBody = body ?? { message: 'Internal Server Error' };
        const chainable = cy.intercept(method as any, url as any, {
            statusCode: 500,
            body: responseBody
        });
        return alias ? chainable.as(alias) : chainable;
    }
);

Cypress.Commands.add(
    'login',
    () => {
        localStorage.setItem('ADMIN_STORAGE', JSON.stringify({
            auth: {
                accessToken: 'T'.repeat(100),
                accessTokenExpiresIn: Date.now() + 1000 * 60 * 60 * 24,
                refreshToken: 'R'.repeat(100),
                refreshTokenExpiresIn: Date.now() + 1000 * 60 * 60 * 24 * 7,
            },
        }))
    }
)

export {};

//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
