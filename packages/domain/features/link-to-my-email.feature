Feature: Link my device to my email
  As a meditation practitioner
  I want my meditation history to be saved not only on my device
  so that I can access it from any device and retrieve it if I lose my device

Scenario: Link a device to my email
    Given I have used the app without an account
    When I provide my email
    Then I should receive an email with a activation link in my inbox
    And clicking the link should link my device to my email

Scenario: Sync meditation history across devices
    Given I have linked a device to my email
    And I have meditation history saved on the server
    When I link another device to the same email
    Then my meditation history should be available on the new device

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