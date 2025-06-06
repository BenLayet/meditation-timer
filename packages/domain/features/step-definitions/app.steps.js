import { When } from "@cucumber/cucumber";

When(/^I open the app$/, function () {
  this.vm().dispatchers.appOpened();
});
