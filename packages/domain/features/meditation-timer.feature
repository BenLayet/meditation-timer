Feature: Meditation timer
  As a meditation practitioner
  I want to have a timer that helps me to keep track of my meditation time
  so that I can get notified when my meditation session is over
  and to get motivated to meditate regularly

  Scenario: Opening the meditation timer app for the first time
    When I go to the app
    Then the timer should display 05:00
    And I can start a meditation session
    And I can change the duration of the meditation
    And I can change the volume of the sound of the notification

  Scenario: Starting a meditation session
    Given the timer displays 05:00
    When I start a meditation session
    Then the preparation should start
    And the timer should not be running yet

  Scenario: Preparation time ends
    Given I have started a meditation session
    And the preparation time is running
    When the preparation time ends
    Then a gong sound should be played
    And the meditation timer should start running

  Scenario: Meditation time ends
    Given I have started a meditation session
    When the meditation time ends
    Then a gong sound should be played
    And the timer should stop running