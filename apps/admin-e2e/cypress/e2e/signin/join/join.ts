import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import {
    visitJoin,
    submitJoinForm,
    typeJoinCode,
    typeJoinPassword,
    typeJoinConfirmPassword
} from '../../../utils/join.po';

const INVITE_URL = '**/api/v1/identity/invites/*';
const SIGNUP_URL = '**/api/v1/identity/auth/signup';

Given('I open the join page', () => {
    visitJoin();
});

When('I submit the join form', () => {
    submitJoinForm();
});

Then('I should see text {string}', (text: string) => {
    cy.contains(text).should('be.visible');
});

Given(
    'the invite request is mocked as not found with alias {string}',
    (alias: string) => {
        cy.interceptNotFound(
            'GET',
            INVITE_URL,
            { message: 'Not Found' },
            alias
        );
    }
);

When('I type invite code {string}', (code: string) => {
    typeJoinCode(code);
});

Then('I should see the password step', () => {
    cy.get('input[name="password"]').should('be.visible');
    cy.get('input[name="confirmPassword"]').should('be.visible');
    cy.contains('Finish').should('be.visible');
});

Given(
    'the invite request is mocked as ok with code {string} and alias {string}',
    (code: string, alias: string) => {
        cy.interceptOk(
            'GET',
            INVITE_URL,
            {
                data: {
                    id: 'invite-id',
                    code,
                    user: {
                        id: 'user-id',
                        email: 'user@example.com',
                        fullName: 'User Name'
                    },
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            },
            alias
        );
    }
);

When(
    'I type password {string} and confirm password {string}',
    (password: string, confirm: string) => {
        typeJoinPassword(password);
        typeJoinConfirmPassword(confirm);
    }
);

Given(
    'the signup request is mocked as created with alias {string}',
    (alias: string) => {
        cy.interceptCreated(
            'POST',
            SIGNUP_URL,
            { data: { success: true } },
            alias
        );
    }
);

When('I wait for request {string}', (alias: string) => {
    cy.wait(`@${alias}`);
});

Then('I am on the login page', () => {
    cy.location('pathname').should('eq', '/signin');
});
