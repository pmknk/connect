import { LoginPage } from '../../support/login.po';

describe('Signin Login', () => {
    const login = new LoginPage();

    beforeEach(() => {
        login.visit();
    });

    it('should show Authentication Error when invalid credentials are provided', () => {
        cy.interceptUnauthorized(
            'POST',
            '**/api/v1/identity/auth/signin',
            { message: 'Invalid email or password' },
            'signinRequest'
        );

        login.typeEmail('test@test.com');
        login.typePassword('password');

        login.submitForm();
        cy.wait('@signinRequest');

        cy.contains('Authorization failed').should('be.visible');
    });

    it('should show Internal Server Error when server returns 500', () => {
        cy.interceptServerError(
            'POST',
            '**/api/v1/identity/auth/signin',
            { message: 'Internal Server Error' },
            'signinRequest'
        );

        login.typeEmail('test@test.com');
        login.typePassword('password');

        login.submitForm();
        cy.wait('@signinRequest');

        cy.contains('Internal Server Error').should('be.visible');
    });

    it('should show required validation messages when submitting empty form', () => {
        login.submitForm();

        cy.contains('Email is required').should('be.visible');
        cy.contains('Password is required').should('be.visible');
    });

    it('should navigate to /signin/join when clicking Join now', () => {
        login.clickJoinNow();
        cy.location('pathname').should('eq', '/signin/join');
    });
});
