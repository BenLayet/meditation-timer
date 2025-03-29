Feature: Retrieving user data
    As a user with multiple devices
    I want to be able to retrieve my data from the server
    So that I can consolidate my data and have a seamless experience across devices

  Scenario: First time user
    Given I am a first time user
    When I retrieve my data
    Then I should receive an empty data set

  Scenario: Getting data from another device
    Given my app on device 1 has saved data
    When I retrieve my data from device 2
    Then I should receive the data from device 1