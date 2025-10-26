export class JoinPage {
    visit() {
        cy.visit('/signin/join');
    }

    getCodeInput() {
        return cy.get('input[name="code"]');
    }

    getPasswordInput() {
        return cy.get('input[name="password"]');
    }

    getConfirmPasswordInput() {
        return cy.get('input[name="confirmPassword"]');
    }

    getSubmitButton() {
        return cy.get('button[type="submit"]');
    }

    typeCode(code: string) {
        this.getCodeInput().clear().type(code);
    }

    typePassword(password: string) {
        this.getPasswordInput().clear().type(password);
    }

    typeConfirmPassword(password: string) {
        this.getConfirmPasswordInput().clear().type(password);
    }

    submitForm() {
        this.getSubmitButton().click();
    }
}


