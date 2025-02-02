Feature: Timer

  Scenario: Timer is started
    Given the timer is not running
    And the duration is 120 seconds
    When the timer is started
    Then the timer should be running
    And the time should be 120 seconds

  Scenario: Timer is paused
    Given the timer is running
    And the time is 120 seconds
    When the timer is paused
    And a second has elapsed
    Then the timer should not be running
    And the time should be 120 seconds

  Scenario: Timer is reset
    Given the timer is running
    And the time is 10 seconds
    And the duration is 120 seconds
    When the timer is reset
    And a second has elapsed
    Then the timer should not be running
    And the time should be 120 seconds

  Scenario: Timer expires
    Given the timer is running
    And the time is 120 seconds
    When the timer expires
    And a second has elapsed
    Then the timer should not be running
    And the time should be 120 seconds

  Scenario: Timer ticks
    Given the timer is running
    And the time is 120 seconds
    When a second has elapsed
    Then the time should be 119 seconds

  Scenario: Duration is set when timer is running
    Given the timer is running
    And the time is 120 seconds
    When the duration is set to 1200 seconds
    Then the time should be 1200 seconds
    And the timer should not be running