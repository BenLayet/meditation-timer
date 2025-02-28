Feature: Settings
    As a meditation practitioner who uses the meditation timer app regularly
    I want to be able to change the settings of the app once and for all
    so that I don't have to change them every time I use the app

    Scenario: Automatically detect language the first time the app is opened
        Given French is the language of the device
        When I open the app
        Then the language of the app should be French

    Scenario: Changing the language of the app
        When I change the language of the app to English
        Then the language of the app should be English