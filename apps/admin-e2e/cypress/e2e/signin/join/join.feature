Feature: Sign up - Join
    Background:
        Given I open the signup page
    
    @validation
    Scenario: Show invite code form validation errors when the form is submitted
        When I submit the invite code form
        Then I should see text "Invitation code is required"

    @clientError
    Scenario: Show "Invitation code not found" when the invite form is submitted and the API returns a 404 error
        Given the signin request is mocked as not found with message "Invitation code not found" and alias "getInviteCode"
        When I fill the invite form with Invitation Code "testbest"
        And I submit the invite code form
        And I wait for request "getInviteCode"
        Then I should see text "Invitation code not found"

    Scenario: Show password set page after success invite code
        Given the signin request is mocked as success with alias "getInviteCode"
        When I fill the invite form with Invitation Code "testbest"
        And I submit the invite code form
        And I wait for request "getInviteCode"
        Then I should see text "Password"
        And I should see text "Confirm Password"

    @validation
    Scenario: Show password code form validation errors when the form is submitted (no password added)
        Given the signin request is mocked as success with alias "getInviteCode"
        When I fill the invite form with Invitation Code "testbest"
        And I submit the invite code form
        And I wait for request "getInviteCode"
        And I submit the invite code form
        Then I should see text "Password must be at least 8 characters"

    @validation
    Scenario: Show password code form validation errors when the form is submitted (confirm password is wrong)
        Given the signin request is mocked as success with alias "getInviteCode"
        When I fill the invite form with Invitation Code "testbest"
        And I submit the invite code form
        And I wait for request "getInviteCode"
        And I fill the password form with Password "Test123@!!+123"
        And I fill the confirm password form with Confirm Password "Test123@!!+123!!"
        And I submit the invite code form
        Then I should see text "Passwords do not match"

    @success
    Scenario: Navigate to login page when the user finished signup successfully
        Given the signin request is mocked as success with alias "getInviteCode"
        And the join request is mocked as success with alias "joinRequest"
        When I fill the invite form with Invitation Code "testbest"
        And I submit the invite code form
        And I wait for request "getInviteCode"
        And I fill the password form with Password "Test123@!!+123"
        And I fill the confirm password form with Confirm Password "Test123@!!+123"
        And I submit the invite code form
        Then I should be navigated to the "/signin"
        And I should see text "Account created successfully"
        