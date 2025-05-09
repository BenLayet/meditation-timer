import {Before, When} from "@cucumber/cucumber";
import {reset} from "./state-manager/test-state-manager.js";
import { stateManager } from "./state-manager/test-state-manager.js";

Before(reset);

When(/^I open the app$/, function () {
    stateManager.getRootVM().dispatchers.appOpened();
});
