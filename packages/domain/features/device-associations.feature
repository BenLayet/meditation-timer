Feature: Device associations
  As a meditation practitioner
  I want my meditation history to be saved not only on my device
  so that I can access it from any device and retrieve it if I lose my device

Scenario: Request association of a device with an email
    Given I have used the app without an account
    When I provide my email
    Then I should receive a link in my inbox to associate my device with my email

Scenario: Validate association of a device with an email
    Given I have received a link in my email to associate my device with my email
    When I click the link
    Then I should be redirected to the app
    And my past meditations on this device should be associated to my email
    And my future meditations on this device should be associated to my email
    
Scenario: Retrieve meditation history from other devices
    Given I have associated a first device with my email
    And I have a meditation history from this first device saved on the server
    When I associate a second device with my email
    Then I should retrieve my meditation history from the first device on the second device

Scenario: Consolidating multiple devices
    Given I have associated multiple devices with my email
    When I add a new meditation on one device
    Then I should see the new meditation on all devices
    
Scenario: Remove association of device with email
    Given I have associated a device with my email
    When I remove the association
    Then my meditation history on this device should be cleared
    And I can associate the device with a different email
    And my meditation history on the server should remain intact