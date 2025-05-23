import { validateEmailFormat } from "./email.validator.js";

export const emailVerificationStatus = {
  NOT_REQUESTED: "NOT_REQUESTED",
  REQUESTED: "REQUESTED",
  VERIFIED: "VERIFIED",
  EXPIRED: "EXPIRED",
};
const statusSequence = Object.values(emailVerificationStatus);
export function validateNewEmailVerification(emailVerification) {
  if (typeof emailVerification !== "object")
    throw new Error("Email verification cannot be null or undefined");
  if (typeof emailVerification.email !== "string")
    throw new Error("Email verification email must be a string");
  validateEmailFormat(emailVerification.email);
}

export function validateEmailVerificationStatus(status) {
  if (typeof status !== "string")
    throw new Error("Email verification status must be a string");
  if (status.length === 0)
    throw new Error("Email verification status cannot be empty");
  if (!statusSequence.includes(status))
    throw new Error(`Email verification status ${status} is not valid`);
}

export function validateStatusTransition(fromStatus, toStatus) {
  const fromStatusIndex = statusSequence.indexOf(fromStatus);
  const toStatusIndex = statusSequence.indexOf(toStatus);
  if (fromStatusIndex === -1)
    throw new Error(`Email verification status ${fromStatus} is not valid`);
  if (toStatusIndex === -1)
    throw new Error(`Email verification status ${toStatus} is not valid`);
  if (toStatusIndex !== fromStatusIndex + 1)
    throw new Error(
      `Email verification status cannot be changed from ${fromStatus} to ${toStatus}`,
    );
}

export function validateEmailVerification(emailVerification) {
  if (typeof emailVerification !== "object")
    throw new Error("Email verification cannot be null or undefined");
  validateEmailFormat(emailVerification.email);
  validateEmailVerificationStatus(emailVerification.status);
}
