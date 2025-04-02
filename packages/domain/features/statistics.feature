Feature: Meditation statistics
  As a meditation practitioner
  I want to keep track of my meditation time
  so that I get motivated to meditate regularly

  Scenario: Save meditation session
    Given I had a daily streak of 5 days and meditated 45 minutes every day
    And I have started a meditation session
    And the actual meditation has started
    When the actual meditation has completed
    Then the meditation session should be saved
    And my new daily streak should be displayed