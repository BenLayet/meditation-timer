import { validate } from "uuid";

export function validateNewEmailActivation(emailactivation) {
  if(typeof emailactivation !== "object") throw new Error("Email activation cannot be null or undefined");
  if(typeof emailactivation.uuid !== "string") throw new Error("Email activation uuid must be a string");
  if(emailactivation.uuid.length === 0) throw new Error("Email activation uuid cannot be empty");
  if(!validate(emailactivation.uuid)) throw new Error(`Invalid UUID ${emailactivation.uuid}`)
  if(typeof emailactivation.email !== "string") throw new Error("Email activation email must be a string");
  if(emailactivation.email.length === 0) throw new Error("Email activation email cannot be empty");
  if(emailactivation.status !== "PENDING_VERIFICATION") throw new Error("Email activation status must be a PENDING_VERIFICATION at creation");
}

const statusSequence = [
  "PENDING_VERIFICATION",
  "VERIFIED",
  "USER_ALREADY_CREATED",
];

export function validateStatusTransition(fromStatus, toStatus){
  const fromStatusIndex = statusSequence.indexOf(fromStatus);
  const toStatusIndex = statusSequence.indexOf(toStatus);
  if(fromStatusIndex === -1) throw new Error(`Email activation status ${fromStatus} is not valid`);
  if(toStatusIndex === -1) throw new Error(`Email activation status ${toStatus} is not valid`);
  if(toStatusIndex !== fromStatus + 1) throw new Error(`Email activation status cannot be changed from ${fromStatus} to ${toStatus}`);
}
