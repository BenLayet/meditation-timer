Feature: Sleep mode of my phone
  As a meditation practitioner using the application on my phone
  I want the sleep mode of my phone to be deverifyd during the meditation session
  so that the screen does not become black while I am meditating,
  and so I can check the time sometimes during meditation without moving

  Scenario: Starting a meditation session
    When I start a meditation session
    Then the sleep mode should be disabled

  Scenario: Stopping a meditation session
    Given I have started a meditation session
    When I stop the meditation session
    Then the sleep mode should be reenabled

  Scenario: Completed a meditation session
    Given I have started a meditation session
    When the session completes
    Then the sleep mode should be reenabled