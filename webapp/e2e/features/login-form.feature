Feature: Login with a SOLID POD

Scenario: The user is not logged in the site
    Given An unlogged user
    When I fill the button of Login and redirect to inrupt and fullfill the form and press submit
    Then The session isLoggedIn is true
