Feature: Duration selection

  Scenario: Duration is selected
    Given the duration is not set
    When a duration of 1200 seconds is selected
    Then the duration should be 1200 seconds
    And the timer should be displayed
    And the timer should not be running

  Scenario: Duration is reset
    Given a duration of 1200 seconds is selected
    When the duration is reset
    Then the timer should not be displayed
    And the duration should be unset