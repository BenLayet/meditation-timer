Feature: Account Management
  As a meditation practitioner
  I want my meditation history to be saved not only on my device
  so that I can access it from any device and retrieve it if I lose my device

  Scenario: Create an account
    Given I have not created an account yet
    When I create an account with my email
    Then I should receive an email with a verification link in my inbox
    And I can see that my email is pending verification

  Scenario: Open the app before verifying email
    Given I have just created an account
    And I have not verified my email yet
    When I open the app
    Then I can see that my email is pending verification
    And I can cancel the account creation

  Scenario: Cancel account creation
    Given I have just created an account
    And I have not verified my email yet
    When I cancel the account creation
    Then my email should not be visible anymore
    And I should be able to create an account again

  Scenario: Verify my email
    Given I have just clicked the link to verify my email
    When I open the app
    Then I should be authenticated
    And I should be able to disconnect

  Scenario: Share meditations across devices
    Given I have connected on multiple devices using the same email address
    When I add a new meditation on one device
    Then the new meditation should appear on all devices

  Scenario: Disconnect
    Given I am authenticated
    When I disconnect
    Then my email should not be visible anymore
    And my meditation history on the device should be cleared
    And my meditation history on the server should remain intact
    And I should be able to create an account again