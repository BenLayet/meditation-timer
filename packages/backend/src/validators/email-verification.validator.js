const statusSequence = ["PENDING_VERIFICATION", "VERIFIED", "USER_CREATED"];

export function validateNewEmailActivation(emailactivation) {
  if (typeof emailactivation !== "object")
    throw new Error("Email activation cannot be null or undefined");
  if (typeof emailactivation.email !== "string")
    throw new Error("Email activation email must be a string");
  if (emailactivation.email.length === 0)
    throw new Error("Email activation email cannot be empty");
  if(!isEmailFormat(emailactivation.email))
    throw new Error("Email activation email must be a valid email");
  if (emailactivation.status !== statusSequence[0])
    throw new Error(
      `Email activation status must be ${statusSequence[0]} at creation`
    );
}
const isEmailFormat = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export function validateStatusTransition(fromStatus, toStatus) {
  const fromStatusIndex = statusSequence.indexOf(fromStatus);
  const toStatusIndex = statusSequence.indexOf(toStatus);
  if (fromStatusIndex === -1)
    throw new Error(`Email activation status ${fromStatus} is not valid`);
  if (toStatusIndex === -1)
    throw new Error(`Email activation status ${toStatus} is not valid`);
  if (toStatusIndex !== fromStatusIndex + 1)
    throw new Error(
      `Email activation status cannot be changed from ${fromStatus} to ${toStatus}`
    );
}
