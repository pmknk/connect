export function visitLogin() {
    cy.visit('/signin');
}

export function getLoginEmailInput() {
    return cy.get('input[name="email"]');
}

export function getLoginPasswordInput() {
    return cy.get('input[name="password"]');
}

export function getLoginSubmitButton() {
    return cy.get('button[type="submit"]');
}

export function getJoinNowLink() {
    return cy.contains('a', 'Join now');
}

export function typeLoginEmail(email: string) {
    getLoginEmailInput().clear().type(email);
}

export function typeLoginPassword(password: string) {
    getLoginPasswordInput().clear().type(password);
}

export function submitLoginForm() {
    getLoginSubmitButton().click();
}

export function clickJoinNow() {
    getJoinNowLink().click();
}
