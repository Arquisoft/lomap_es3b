Feature: Create a Map Marker

Scenario: The user is logged and add a new Marker
    Given A logged user and a point
    When I click on the map and add a new marker
    Then The marker appears on the map
