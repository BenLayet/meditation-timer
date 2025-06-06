export function validateEmailFormat(email) {
  if (typeof email !== "string") {
    throw new Error(`Email must be a string but was of type ${typeof email}`);
  }
  if (email.length === 0) {
    throw new Error("Email cannot be empty");
  }
  if (!isEmailFormat(email)) {
    throw new Error("Email must be a valid email");
  }
}
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isEmailFormat = (email) => emailRegex.test(email);
