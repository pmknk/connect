import { visitJoin, submitJoinForm, typeJoinCode, typeJoinPassword, typeJoinConfirmPassword } from '../../utils/join.po';

const INVITE_URL = '**/api/v1/identity/invites/*';
const SIGNUP_URL = '**/api/v1/identity/auth/signup';

describe('Signin Join', () => {

    beforeEach(() => {
        visitJoin();
    });

    describe('Invite code ', () => {
        it('should show validation message when submitting empty code', () => {
            submitJoinForm();
            cy.contains('Code is required').should('be.visible');
        });

        it('should show not found error when invite code is invalid (404)', () => {
            cy.interceptNotFound('GET', INVITE_URL, { message: 'Not Found' }, 'inviteRequest');
    
            typeJoinCode('WRONGCODE');
            submitJoinForm();
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
    
            typeJoinCode('VALIDCODE');
            submitJoinForm();
            cy.wait('@inviteRequest');
    
            cy.get('input[name="password"]').should('be.visible');
            cy.get('input[name="confirmPassword"]').should('be.visible');
            cy.contains('Finish').should('be.visible');
        });
    })

    describe('Password form', () => {
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
    
            typeJoinCode('VALIDCODE');
            submitJoinForm();
            cy.wait('@inviteRequest');
    
            // too short + pattern fail
            typeJoinPassword('short');
            typeJoinConfirmPassword('short2');
            submitJoinForm();
    
            cy.contains('Password must be at least 8 characters').should('be.visible');
            cy.contains('Passwords do not match').should('be.visible');

            typeJoinPassword('nopassedregex');
            typeJoinConfirmPassword('short2');

            submitJoinForm();

            cy.contains('Password must contain at least one uppercase letter, one lowercase letter, and one number').should('be.visible');
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
    
            typeJoinCode('VALIDCODE');
            submitJoinForm();
            cy.wait('@inviteRequest');
    
            typeJoinPassword('ValidPass1');
            typeJoinConfirmPassword('ValidPass1');
            submitJoinForm();
            cy.wait('@signupRequest');
    
            cy.location('pathname').should('eq', '/signin');
        });
    })
});
