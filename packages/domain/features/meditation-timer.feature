Feature: Meditation timer
  As a meditation practitioner
  I want to have a timer that helps me to keep track of my meditation time
  so that I can get notified when my meditation session is over

  Scenario: Actual meditation starts
    Given I have started a meditation session
    When the preparation duration has elapsed
    Then a gong sound should be played
    And the meditation timer should start running

  Scenario: Meditation timer ticks
    Given the next meditation duration is 20:00
    And the actual meditation has started
    When a second has elapsed during actual meditation
    Then the timer should display 19:59

  Scenario: Actual meditation ends
    Given I have started a meditation session
    And the actual meditation has started
    When the actual meditation has completed
    Then a gong sound should be played
    And the timer should stop
    And the statistics are shown
