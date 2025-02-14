import { Given, Then, When } from "@cucumber/cucumber";

Given(/^the language of the device is (English|French)$/, function (language) {
});

Then(/^the language of the app should be (English|French)$/, function (language) {
});

When(/^I change the language of the app to (English|French)$/, function (language) {
});
Given(/^French is the language of the device$/, function () {
});