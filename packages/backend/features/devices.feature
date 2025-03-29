Feature: Registering devices
    As a user with multiple devices
    I want to be able to retrieve my list of devices
    So that I can consolidate my data from all devices

  Scenario: Associate device to email address
    Given I have associated my device to my email address
    When I retrieve my list of devices from my email address
    Then my device should be in the list
