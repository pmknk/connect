Feature: Sign in - Login

  Background:
    Given I open the login page

  Scenario: Show Authentication Error when invalid credentials are provided
    Given the signin request is mocked as unauthorized with message "Invalid email or password" and alias "signinRequest"
    When I fill the login form with email "test@test.com" and password "password"
    And I submit the login form
    And I wait for request "signinRequest"
    Then I should see text "Authorization failed"

  Scenario: Show Internal Server Error when server returns 500
    Given the signin request is mocked as server error with message "Internal Server Error" and alias "signinRequest"
    When I fill the login form with email "test@test.com" and password "password"
    And I submit the login form
    And I wait for request "signinRequest"
    Then I should see text "Internal Server Error"

  Scenario: Show required validation messages when submitting empty form
    When I submit the login form
    Then I should see text "Email is required"
    And I should see text "Password is required"

  Scenario: Navigate to join page from login
    When I click the Join now link
    Then I am on the join page

