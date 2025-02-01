Feature: Timer

  Scenario: Timer is started
    Given the timer is not running
    And the time is 120 seconds
    When the timer is started
    Then the timer should be running
    And the time should be 0 seconds

  Scenario: Timer is stopped
    Given the timer is running
    And the time is 120 seconds
    When the timer is stopped
    And a second has elapsed
    Then the timer should not be running
    And the time should be 120 seconds

  Scenario: Timer is reset
    Given the timer is running
    And the time is 120 seconds
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
    Then the time should be 121 seconds