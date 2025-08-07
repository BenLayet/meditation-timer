Feature: Account Management
  As a meditation practitioner
  I want my meditation history to be saved not only on my device
  so that I can access it from any device and retrieve it if I lose my device

  Scenario: Create an account
    Given I have not created an account yet
    When I create an account with my login
    Then I should be authenticated
    And I should be able to disconnect

  Scenario: Share meditations across devices
    Given I have connected on multiple devices using the same login
    When I add a new meditation on one device
    Then the new meditation should appear on all devices

  Scenario: Disconnect
    Given I am authenticated
    When I disconnect
    Then my login should not be visible anymore
    And my meditation history on the device should be cleared
    And my meditation history on the server should remain intact
    And I should be able to create an account again