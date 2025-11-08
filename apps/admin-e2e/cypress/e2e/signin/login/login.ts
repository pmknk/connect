import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import {
    visitLogin,
    typeLoginEmail,
    typeLoginPassword,
    submitLoginForm,
    clickJoinNow
} from '../../../utils/login.po';

Given('I open the login page', () => {
    visitLogin();
});

Given(
    'the signin request is mocked as unauthorized with message {string} and alias {string}',
    (message: string, alias: string) => {
        cy.interceptUnauthorized(
            'POST',
            '**/api/v1/identity/auth/signin',
            { message },
            alias
        );
    }
);

Given(
    'the signin request is mocked as server error with message {string} and alias {string}',
    (message: string, alias: string) => {
        cy.interceptServerError(
            'POST',
            '**/api/v1/identity/auth/signin',
            { message },
            alias
        );
    }
);

When(
    'I fill the login form with email {string} and password {string}',
    (email: string, password: string) => {
        typeLoginEmail(email);
        typeLoginPassword(password);
    }
);

When('I submit the login form', () => {
    submitLoginForm();
});

When('I wait for request {string}', (alias: string) => {
    cy.wait(`@${alias}`);
});

Then('I should see text {string}', (text: string) => {
    cy.contains(text).should('be.visible');
});

When('I click the Join now link', () => {
    clickJoinNow();
});

Then('I am on the join page', () => {
    cy.location('pathname').should('eq', '/signin/join');
});
