Feature: Meditation session setup
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

  Scenario: Setting gong off
    When I open the app
    And I toggle the gong off
    Then the gong should be off

  Scenario: Setting gong on
    Given the gong is off
    And I toggle the gong on
    Then the gong should be on