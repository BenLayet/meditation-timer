Feature: Preparation
  As a meditation practitioner
  I want to have a little time to sit before the actual meditation
  so that the meditation can start when I am sitting comfortably and straight

  Scenario: Starting a meditation session
    When I start a meditation session
    Then the preparation timer should start running
    And the meditation timer should not be running
    And I can stop the meditation session

  Scenario: Preparation ends
    Given I have started a meditation session
    When the preparation duration has elapsed
    Then the preparation timer should stop running
    And the meditation timer should start running

  Scenario: Preparation timer ticks
    Given I have started a meditation session
    And the preparation has started
    When a second has elapsed during preparation
    Then the preparation timer should display 00:19

  Scenario: Requesting more time during preparation
    Given I have started a meditation session
    And the preparation has started
    When I request more time during the preparation
    Then the preparation timer should display 00:40
