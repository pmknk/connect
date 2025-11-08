export function visitJoin() {
    cy.visit('/signin/join');
}

export function getJoinCodeInput() {
    return cy.get('input[name="code"]');
}

export function getJoinPasswordInput() {
    return cy.get('input[name="password"]');
}

export function getJoinConfirmPasswordInput() {
    return cy.get('input[name="confirmPassword"]');
}

export function getJoinSubmitButton() {
    return cy.get('button[type="submit"]');
}

export function typeJoinCode(code: string) {
    getJoinCodeInput().clear().type(code);
}

export function typeJoinPassword(password: string) {
    getJoinPasswordInput().clear().type(password);
}

export function typeJoinConfirmPassword(password: string) {
    getJoinConfirmPasswordInput().clear().type(password);
}

export function submitJoinForm() {
    getJoinSubmitButton().click();
}
