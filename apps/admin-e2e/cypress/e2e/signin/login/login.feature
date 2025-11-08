Feature: Sign in - Login

    Background:
        Given I open the login page

    @validation
    Scenario: Show form validation errors when the form is submitted
        When I submit the login form
        Then I should see text "Email is required"
        And I should see text "Password is required"

    @backendError
    Scenario: Show "Internal Server Error" when the form is submitted and the API returns a 500 error
        Given the signin request is mocked as server error with message "Internal Server Error" and alias "signinRequest"
        When I fill the login form with email "test@test.com" and password "password"
        And I submit the login form
        And I wait for request "signinRequest"
        Then I should see text "Internal Server Error"

    @clientError
    Scenario: Show "Authorization failed" when the form is submitted and the API returns a 401 error
        Given the signin request is mocked as unauthorized with message "Invalid email or password" and alias "signinRequest"
        When I fill the login form with email "test@test.com" and password "password"
        And I submit the login form
        And I wait for request "signinRequest"
        Then I should see text "Authorization failed"

    @success
    Scenario: Navigate to "/" when the form is submitted and the API returns 200
        Given the signin request is mocked as success with alias "signinRequest"
        When I fill the login form with email "test@test.com" and password "password"
        And I submit the login form
        And I wait for request "signinRequest"
        Then I should be navigated to the "/"

    @navigate
    Scenario: Navigate to join page from login
        When I click the Join now link
        Then I should be navigated to the "/signin/join"

