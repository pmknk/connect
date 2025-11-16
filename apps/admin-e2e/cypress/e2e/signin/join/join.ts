import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import {
    visitJoin,
    submitJoinForm,
    typeJoinCode,
    typeJoinPassword,
    typeJoinConfirmPassword
} from '../../../utils/join.po';

const INVITES_URL = '**/api/v1/identity/invites/*';
const JOIN_URL = '**/api/v1/identity/auth/signup';

Given('I open the signup page', () => {
    visitJoin();
});

Given(
    'the signin request is mocked as not found with message {string} and alias {string}',
    (message: string, alias: string) => {
        cy.interceptNotFound('GET', INVITES_URL, { message }, alias);
    }
);

Given(
    'the signin request is mocked as success with alias {string}',
    (alias: string) => {
        cy.interceptOk('GET', INVITES_URL, {}, alias);
    }
);

Given('the join request is mocked as success with alias "joinRequest"', () => {
    cy.interceptOk(
        'POST',
        JOIN_URL,
        {
            data: {
                success: true
            }
        },
        'joinRequest'
    );
});

When('I submit the invite code form', () => {
    submitJoinForm();
});

When('I fill the invite form with Invitation Code {string}', (code: string) => {
    typeJoinCode(code);
});

When('I wait for request {string}', (alias: string) => {
    cy.wait(`@${alias}`);
});

When('I fill the password form with Password {string}', (password: string) => {
    typeJoinPassword(password);
});

When(
    'I fill the confirm password form with Confirm Password {string}',
    (confirmPassword: string) => {
        typeJoinConfirmPassword(confirmPassword);
    }
);

Then('I should see text {string}', (text: string) => {
    cy.contains(text).should('be.visible');
});

Then('I should be navigated to the {string}', (path: string) => {
    cy.location('pathname').should('eq', path);
});
