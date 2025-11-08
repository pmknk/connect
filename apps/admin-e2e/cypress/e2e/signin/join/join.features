Feature: Sign in - Join

  Background:
    Given I open the join page

  Scenario: Show validation message when submitting empty code
    When I submit the join form
    Then I should see text "Code is required"

  Scenario: Show not found error when invite code is invalid (404)
    Given the invite request is mocked as not found with alias "inviteRequest"
    When I type invite code "WRONGCODE"
    And I submit the join form
    And I wait for request "inviteRequest"
    Then I should see text "Invitation code not found"
    And I should see text "The invitation code you entered is incorrect"

  Scenario: Proceed to password step after valid invite code
    Given the invite request is mocked as ok with code "VALIDCODE" and alias "inviteRequest"
    When I type invite code "VALIDCODE"
    And I submit the join form
    And I wait for request "inviteRequest"
    Then I should see the password step

  Scenario: Validate password rules and mismatched confirm password
    Given the invite request is mocked as ok with code "VALIDCODE" and alias "inviteRequest"
    When I type invite code "VALIDCODE"
    And I submit the join form
    And I wait for request "inviteRequest"
    When I type password "short" and confirm password "short2"
    And I submit the join form
    Then I should see text "Password must be at least 8 characters"
    And I should see text "Passwords do not match"
    When I type password "nopassedregex" and confirm password "short2"
    And I submit the join form
    Then I should see text "Password must contain at least one uppercase letter, one lowercase letter, and one number"

  Scenario: Finish join and navigate back to signin on success
    Given the invite request is mocked as ok with code "VALIDCODE" and alias "inviteRequest"
    And the signup request is mocked as created with alias "signupRequest"
    When I type invite code "VALIDCODE"
    And I submit the join form
    And I wait for request "inviteRequest"
    When I type password "ValidPass1" and confirm password "ValidPass1"
    And I submit the join form
    And I wait for request "signupRequest"
    Then I am on the login page

