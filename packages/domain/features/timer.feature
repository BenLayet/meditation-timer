Feature: Timer

  Scenario: Timer is started
    Given the timer is not running
    And a duration of 120 seconds is selected
    When the timer is started
    Then the timer should be running
    And the remaining time should be 120 seconds

  Scenario: Timer ticks
    Given the timer is running
    And the time is 120 seconds
    When a second has elapsed
    Then the remaining time should be 119 seconds
