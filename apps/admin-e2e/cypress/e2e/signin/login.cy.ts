describe('Signin Login', () => {
    beforeEach(() => {
        cy.visit('/signin');
    });

    it('should show Authentication Error when invalid credentials are provided', () => {
        cy.intercept('POST', '**/api/v1/identity/auth/signin', {
            statusCode: 401,
            body: { message: 'Invalid email or password' }
        }).as('signinRequest');

        cy.get('input[name="email"]').type('test@test.com');
        cy.get('input[name="password"]').type('password');

        cy.get('button[type="submit"]').click();
        cy.wait('@signinRequest');

        cy.contains('Authorization failed').should('be.visible');
    })

    it('should show Internal Server Error when server returns 500', () => {
        cy.intercept('POST', '**/api/v1/identity/auth/signin', {
            statusCode: 500,
            body: { message: 'Internal Server Error' }
        }).as('signinRequest');

        cy.get('input[name="email"]').type('test@test.com');
        cy.get('input[name="password"]').type('password');

        cy.get('button[type="submit"]').click();
        cy.wait('@signinRequest');

        cy.contains('Internal Server Error').should('be.visible');
    })

    it('should show required validation messages when submitting empty form', () => {
        cy.get('button[type="submit"]').click();

        cy.contains('Email is required').should('be.visible');
        cy.contains('Password is required').should('be.visible');
    })
})