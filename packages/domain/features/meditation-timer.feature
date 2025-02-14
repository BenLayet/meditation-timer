Feature: Meditation timer
  As a meditation practitioner
  I want to have a timer that helps me to keep track of my meditation time
  so that I can get notified when my meditation session is over
  and to get motivated to meditate regularly

  Scenario: Opening the meditation timer app for the first time
    When I open the app
    Then the timer should display 05:00
    And I can start a meditation session
    And I can change the duration of the meditation
    And I can change the volume of the sound of the gong

  Scenario: Starting a meditation session
    When I start a meditation session
    Then the preparation should start
    And the timer should not be running yet
    And I can stop the meditation session

  Scenario: Actual meditation starts
    Given I have started a meditation session
    When the preparation ends
    Then a gong sound should be played
    And the meditation timer should start running
    And I can change the volume of the sound of the gong
    But I cannot change the meditation duration
    And I can stop the meditation session

  Scenario: Meditation timer ticks
    Given I have started a meditation session of 20 minutes
    And The actual meditation period has started
    When a second has elapsed
    Then the timer should display 19:59
    And I can stop the meditation session

  Scenario: Meditation period ends
    Given I have started a meditation session
    When the actual meditation ends
    Then a gong sound should be played
    And the timer should stop running
    And my meditation statistics should appear
    And I can go back to the initial state

  Scenario: Display meditation statistics
    Given I have ran several meditation session
    When I open the app
    Then I should see my meditation statistics

  Scenario: Stopping a meditation session
    Given I have started a meditation session
    When I stop the meditation session
    Then the timer should stop running
    And I can continue the meditation session
    And I can go back to the initial state

  Scenario: Changing the duration of the meditation
    When I change the duration of the meditation to 10 minutes
    Then the timer should display 10:00

  Scenario: Changing the volume of the sound of the gong
    When I change the volume of the sound of the gong to 50%
    Then the sound of the gong should be played at 50% of the volume