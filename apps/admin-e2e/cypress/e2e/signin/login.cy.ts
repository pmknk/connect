import { visitLogin, typeLoginEmail, typeLoginPassword, submitLoginForm, clickJoinNow } from '../../utils/login.po';

describe('Signin Login', () => {

    beforeEach(() => {
        visitLogin();
    });

    it('should show Authentication Error when invalid credentials are provided', () => {
        cy.interceptUnauthorized(
            'POST',
            '**/api/v1/identity/auth/signin',
            { message: 'Invalid email or password' },
            'signinRequest'
        );

        typeLoginEmail('test@test.com');
        typeLoginPassword('password');

        submitLoginForm();
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

        typeLoginEmail('test@test.com');
        typeLoginPassword('password');

        submitLoginForm();
        cy.wait('@signinRequest');

        cy.contains('Internal Server Error').should('be.visible');
    });

    it('should show required validation messages when submitting empty form', () => {
        submitLoginForm();

        cy.contains('Email is required').should('be.visible');
        cy.contains('Password is required').should('be.visible');
    });

    it('should navigate to /signin/join when clicking Join now', () => {
        clickJoinNow();
        cy.location('pathname').should('eq', '/signin/join');
    });
});
