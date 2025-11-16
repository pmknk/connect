import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import {
    visitLogin,
    submitLoginForm,
    typeLoginEmail,
    typeLoginPassword,
    clickJoinNow
} from '../../../utils/login.po';

const SIGNIN_URL = '**/api/v1/identity/auth/signin';

Given('I open the login page', () => {
    visitLogin();
});

When('I submit the login form', () => {
    submitLoginForm();
});

When(
    'I fill the login form with email {string} and password {string}',
    (email: string, password: string) => {
        typeLoginEmail(email);
        typeLoginPassword(password);
    }
);

Then('I should see text {string}', (text: string) => {
    cy.contains(text).should('be.visible');
});

When('I wait for request {string}', (alias: string) => {
    cy.wait(`@${alias}`);
});

Given(
    'the signin request is mocked as server error with message {string} and alias {string}',
    (message: string, alias: string) => {
        cy.interceptServerError('POST', SIGNIN_URL, { message }, alias);
    }
);

Given(
    'the signin request is mocked as unauthorized with message {string} and alias {string}',
    (message: string, alias: string) => {
        cy.interceptUnauthorized('POST', SIGNIN_URL, { message }, alias);
    }
);

Given(
    'the signin request is mocked as success with alias {string}',
    (alias: string) => {
        cy.interceptOk(
            'POST',
            SIGNIN_URL,
            {
                data: {
                    accessToken: 'A'.repeat(64),
                    accessTokenExpiresIn: Date.now() + 1000 * 60 * 60,
                    refreshToken: 'R'.repeat(64),
                    refreshTokenExpiresIn: Date.now() + 1000 * 60 * 60 * 24 * 7
                }
            },
            alias
        );
    }
);

Then('I should be navigated to the {string}', (path: string) => {
    cy.location('pathname').should('eq', path);
});

When('I click the Join now link', () => {
    clickJoinNow();
});
