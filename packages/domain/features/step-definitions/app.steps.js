import {Before, When} from "@cucumber/cucumber";
import {reset} from "./state-manager/test-state-manager.js";

Before(function () {
    reset();
});

When(/^I open the app$/, function () {
});
