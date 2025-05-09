import { flow } from "lodash-es";
import { map } from "../../lib/functions/object.functions.js";

const email = accountState => accountState.email;
const isEmailProvided = accountState => !!accountState.email;
const isEmailValidated = accountState => accountState.isEmailValidated;
const isEmailPendingValidation = accountState => accountState.isEmailPendingValidation;

const ownStateSelectors = {
    email,
    isEmailProvided,
    isEmailValidated,
    isEmailPendingValidation,
};

const ownState = compositeState => compositeState.ownState;

export const accountSelectors = map(ownStateSelectors, selector => flow(ownState, selector));