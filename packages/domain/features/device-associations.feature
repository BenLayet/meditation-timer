Feature: Device associations
  As a meditation practitioner
  I want my meditation history to be saved not only on my device
  so that I can access it from any device and retrieve it if I lose my device

Scenario: Associate a device with an email
    Given I have used the app without an account
    When I provide my email
    Then I should receive a link in my inbox
    And clicking the link should associate my device with my email

Scenario: Sync meditation history across devices
    Given I have associated a device with my email
    And I have meditation history saved on the server
    When I associate another device with the same email
    Then my meditation history should be available on the new device

Scenario: Share meditations across devices
    Given I have associated multiple devices with my email
    When I add a new meditation on one device
    Then the new meditation should appear on all associated devices

Scenario: Remove a device association
    Given I have associated a device with my email
    When I remove the association
    Then my meditation history on the device should be cleared
    And I can associate the device with a different email
    And my meditation history on the server should remain intact