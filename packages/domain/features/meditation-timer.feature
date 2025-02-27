Feature: Meditation timer
  As a meditation practitioner
  I want to have a timer that helps me to keep track of my meditation time
  so that I can get notified when my meditation session is over
  and to get motivated to meditate regularly

  Scenario: Opening the meditation timer app for the first time
    When I open the app
    Then the timer should display 05:00
    And I can start a meditation session
    And I can set the duration of the meditation

  Scenario: Starting a meditation session
    When I start a meditation session
    Then the preparation should start
    And the timer should not be running
    And I can stop the meditation session
    And the sleep mode should be disabled

  Scenario: Actual meditation starts
    Given I have started a meditation session
    When the preparation ends
    Then a gong sound should be played
    And the meditation timer should start running
    But I cannot set the duration of the meditation
    And I can stop the meditation session

  Scenario: Meditation timer ticks
    Given I have set the meditation duration to 20 minutes
    And I have started a meditation session
    And The actual meditation has started
    When a second has elapsed
    Then the timer should display 19:59
    And I can stop the meditation session

  Scenario: Actual meditation ends
    Given I have started a meditation session
    And The actual meditation has started
    When the actual meditation time is up
    Then a gong sound should be played
    And the timer should stop
    And my meditation statistics should appear
    And I can go back to the initial state

  Scenario: Resetting a meditation session
    Given I have started a meditation session
    When I reset the meditation session
    Then the timer should not be running
    And I can start another meditation session

  Scenario: Requesting more time for the meditation
    Given I have started a meditation session
    And there are 2 minutes left in the meditation
    When I request more time for the meditation
    Then the timer should display 07:00

  Scenario: Requesting less time for the meditation
    Given I have started a meditation session
    And there are 2 minutes left in the meditation
    When I request less time for the meditation
    Then the timer should display 00:00
    And a gong sound should be played


  Scenario: Requesting more time for the preparation
    Given I have started a meditation session
    And there are 10 seconds left in the preparation
    When I request more time for the preparation
    Then the preparation timer should display 00:30

  Scenario: Requesting less time for the preparation
    Given I have started a meditation session
    And there are 10 seconds left in the preparation
    When I request less time for the preparation
    Then the preparation timer should display 00:00
    And the meditation timer should start running
