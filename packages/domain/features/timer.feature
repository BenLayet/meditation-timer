Feature: Timer

  Scenario: Timer is started
    Given a duration of 120 seconds is set
    When the timer is started
    Then the timer should be running
    And the remaining time should be 02:00

  Scenario: Timer ticks
    Given a duration of 120 seconds is set
    And the timer is started
    When a second has elapsed
    And the remaining time should be 01:59

  Scenario: Timer ticks until zero
    Given a duration of 1 seconds is set
    And the timer is started
    When a second has elapsed
    And the remaining time should be 00:00
    Then the timer should not be running
