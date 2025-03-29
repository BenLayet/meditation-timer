Feature: Checking the API is up
    As a maintainer of the api
     I want to check that the api is up
     so that I can analyze what the problem is if something doesn't work

  Scenario: Checking if status is up
    Given the api is up
    When I check the status
    Then I should receive a 200 status code
    And I should receive a response with the property "status" with the value "UP"