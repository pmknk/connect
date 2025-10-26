import { JoinPage } from '../../support/join.po';

const INVITE_URL = '**/api/v1/identity/invites/*';
const SIGNUP_URL = '**/api/v1/identity/auth/signup';

describe('Signin Join', () => {
    const join = new JoinPage();

    beforeEach(() => {
        join.visit();
    });

    it('should show validation message when submitting empty code', () => {
        join.submitForm();
        cy.contains('Code is required').should('be.visible');
    });

    it('should show not found error when invite code is invalid (404)', () => {
        cy.interceptNotFound('GET', INVITE_URL, { message: 'Not Found' }, 'inviteRequest');

        join.typeCode('WRONGCODE');
        join.submitForm();
        cy.wait('@inviteRequest');

        cy.contains('Invitation code not found').should('be.visible');
        cy.contains('The invitation code you entered is incorrect').should('be.visible');
    });

    it('should proceed to password step after valid invite code', () => {
        cy.interceptOk('GET', INVITE_URL, {
            data: {
                id: 'invite-id',
                code: 'VALIDCODE',
                user: { id: 'user-id', email: 'user@example.com', fullName: 'User Name' },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        }, 'inviteRequest');

        join.typeCode('VALIDCODE');
        join.submitForm();
        cy.wait('@inviteRequest');

        cy.get('input[name="password"]').should('be.visible');
        cy.get('input[name="confirmPassword"]').should('be.visible');
        cy.contains('Finish').should('be.visible');
    });

    it('should validate password rules and mismatched confirm password', () => {
        cy.interceptOk('GET', INVITE_URL, {
            data: {
                id: 'invite-id',
                code: 'VALIDCODE',
                user: { id: 'user-id', email: 'user@example.com', fullName: 'User Name' },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        }, 'inviteRequest');

        join.typeCode('VALIDCODE');
        join.submitForm();
        cy.wait('@inviteRequest');

        // too short + pattern fail
        join.typePassword('short');
        join.typeConfirmPassword('short2');
        join.submitForm();

        cy.contains('Password must be at least 8 characters').should('be.visible');
        cy.contains('Password must contain at least one uppercase letter').should('be.visible');
        cy.contains('Passwords do not match').should('be.visible');
    });

    it('should show server error on signup failure (500)', () => {
        cy.interceptOk('GET', INVITE_URL, {
            data: {
                id: 'invite-id',
                code: 'VALIDCODE',
                user: { id: 'user-id', email: 'user@example.com', fullName: 'User Name' },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        }, 'inviteRequest');

        cy.interceptServerError('POST', SIGNUP_URL, { message: 'Internal Server Error' }, 'signupRequest');

        join.typeCode('VALIDCODE');
        join.submitForm();
        cy.wait('@inviteRequest');

        join.typePassword('ValidPass1');
        join.typeConfirmPassword('ValidPass1');
        join.submitForm();
        cy.wait('@signupRequest');

        cy.contains('Internal Server Error').should('be.visible');
    });

    it('should finish join and navigate back to signin on success', () => {
        cy.interceptOk('GET', INVITE_URL, {
            data: {
                id: 'invite-id',
                code: 'VALIDCODE',
                user: { id: 'user-id', email: 'user@example.com', fullName: 'User Name' },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        }, 'inviteRequest');

        cy.interceptCreated('POST', SIGNUP_URL, { data: { success: true } }, 'signupRequest');

        join.typeCode('VALIDCODE');
        join.submitForm();
        cy.wait('@inviteRequest');

        join.typePassword('ValidPass1');
        join.typeConfirmPassword('ValidPass1');
        join.submitForm();
        cy.wait('@signupRequest');

        cy.location('pathname').should('eq', '/signin');
    });
});
