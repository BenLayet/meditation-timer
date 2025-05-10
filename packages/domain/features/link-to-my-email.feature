Feature: Link my device to my email
  As a meditation practitioner
  I want my meditation history to be saved not only on my device
  so that I can access it from any device and retrieve it if I lose my device

Scenario: Link a device to my email
    Given I have used the app without an account
    When I provide my email
    Then I should receive an email with a activation link in my inbox
    And I can see that my email is pending activation in the app settings

Scenario: Receive an activation link
    Given I have received an email with an activation link
    When I click the link
    And I open the app
    Then my device should be linked to my email
    And I can see that my email is validated in the app settings

Scenario: Share meditations across devices
    Given I have linked multiple devices to my email
    When I add a new meditation on one device
    Then the new meditation should appear on all linked devices

Scenario: Remove a device link
    Given I have linked a device to my email
    When I remove the link
    Then my meditation history on the device should be cleared
    And I can link the device to a different email
    And my meditation history on the server should remain intact