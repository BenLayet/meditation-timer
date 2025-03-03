Feature: Meditation timer
  As a meditation practitioner
  I want to set the parameters of my meditation
  so that I can meditate in the way I want

  Scenario: Opening the meditation timer app for the first time
    When I open the app
    Then the next meditation duration should be 20:00
    And the next preparation duration should be 00:20

  Scenario: Requesting more time for the meditation
    Given the next meditation duration is 10:00
    When I request more time for the meditation
    Then the next meditation duration should be 15:00

  Scenario: Requesting more time for the preparation
    When I open the app
    Given the next preparation duration is 00:20
    When I request more time for the preparation
    Then the next preparation duration should be 00:30

  Scenario: Requesting less time for the preparation
    When I open the app
    Given the next preparation duration is 00:20
    When I request less time for the preparation
    Then the next preparation duration should be 00:10
