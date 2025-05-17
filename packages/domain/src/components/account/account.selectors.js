import { flow } from "lodash-es";
import { map } from "../../lib/functions/object.functions.js";

const email = accountState => accountState.email;
const isEmailProvided = accountState => !!accountState.email;
const status = accountState => accountState.status;
const canUnlinkingBeRequested = accountState => accountState.status === "ACTIVATED";
const hasError = accountState => !!accountState.errorMessage;
const isLoading = accountState => accountState.loading;
const isResettable = accountState => ["ACTIVATION_MAIL_FAILED", "ACTIVATION_MAIL_SENT"].includes(accountState.status);
const errorMessage = accountState => accountState.errorMessage;

const ownStateSelectors = {
    email,
    isEmailProvided,
    status,
    canUnlinkingBeRequested,
    hasError,
    isLoading,
    isResettable,
    errorMessage,
};

const ownState = compositeState => compositeState.ownState;

export const accountSelectors = map(ownStateSelectors, selector => flow(ownState, selector));