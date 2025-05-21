import { emailVerificationStatus } from "domain/src/components/email-verification/email-verification.state.js";

const statusSequence = Object.values(emailVerificationStatus);
export function validateNewEmailVerification(emailVerification) {
  if (typeof emailVerification !== "object")
    throw new Error("Email verification cannot be null or undefined");
  if (typeof emailVerification.email !== "string")
    throw new Error("Email verification email must be a string");
  if (emailVerification.email.length === 0)
    throw new Error("Email verification email cannot be empty");
  if (!isEmailFormat(emailVerification.email))
    throw new Error("Email verification email must be a valid email");
  if (emailVerification.status !== statusSequence[0])
    throw new Error(
      `Email verification status must be ${statusSequence[0]} at creation`
    );
}
const isEmailFormat = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export function validateStatusTransition(fromStatus, toStatus) {
  const fromStatusIndex = statusSequence.indexOf(fromStatus);
  const toStatusIndex = statusSequence.indexOf(toStatus);
  if (fromStatusIndex === -1)
    throw new Error(`Email verification status ${fromStatus} is not valid`);
  if (toStatusIndex === -1)
    throw new Error(`Email verification status ${toStatus} is not valid`);
  if (toStatusIndex !== fromStatusIndex + 1)
    throw new Error(
      `Email verification status cannot be changed from ${fromStatus} to ${toStatus}`
    );
}
