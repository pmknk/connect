export class LoginPage {
    visit() {
        cy.visit('/signin');
    }

    getEmailInput() {
        return cy.get('input[name="email"]');
    }

    getPasswordInput() {
        return cy.get('input[name="password"]');
    }

    getSubmitButton() {
        return cy.get('button[type="submit"]');
    }

    getJoinNowLink() {
        return cy.contains('a', 'Join now');
    }

    typeEmail(email: string) {
        this.getEmailInput().clear().type(email);
    }

    typePassword(password: string) {
        this.getPasswordInput().clear().type(password);
    }

    submitForm() {
        this.getSubmitButton().click();
    }

    clickJoinNow() {
        this.getJoinNowLink().click();
    }
}
