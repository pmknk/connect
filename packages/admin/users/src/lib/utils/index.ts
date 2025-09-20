import { SIGNUP_ROUTE } from "../constants";

/**
 * Generates the invitation URL for a user to sign up with a specific invitation code.
 *
 * @param {string} invitationCode - The invitation code to be included in the URL.
 * @returns {string} The full invitation URL for the signup page with the code as a query parameter.
 */
export const getInvitationUrl = (invitationCode: string): string => {
    return `${window.location.origin}${SIGNUP_ROUTE}?code=${invitationCode}`;
}