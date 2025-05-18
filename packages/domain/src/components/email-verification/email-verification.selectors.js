import { flow } from "lodash-es";
import { map } from "../../lib/functions/object.functions.js";
import { emailVerificationStatus } from "./email-verification.state.js";

const isVerified = emailVerificationState => emailVerificationState.status === emailVerificationStatus.VERIFIED;
const isLoading = emailVerificationState => emailVerificationState.loading;

export const ownStateSelectors = {
    isVerified,
    isLoading,
};

const ownState = compositeState => compositeState.ownState;

export const emailVerificationSelectors = map(ownStateSelectors, selector => flow(ownState, selector));