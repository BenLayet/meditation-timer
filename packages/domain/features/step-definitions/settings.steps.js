import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "chai";
import { onLanguageChanged } from "../../src/settings/settings.reducers.js";

let settings = {};

Given(/^the language of the device is (English|French)$/, function (language) {
    settings.language = language;
});

Then(/^the language of the app should be (English|French)$/, function (language) {
   // expect(settings.language).to.equal(language);
});

When(/^I change the language of the app to (English|French)$/, function (language) {
    settings = onLanguageChanged(settings, language);
});
Given(/^French is the language of the device$/, function () {

});