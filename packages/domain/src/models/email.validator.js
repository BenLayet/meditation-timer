export function validateEmailFormat(email) {
  if (typeof email !== "string") {
    throw new Error("Email must be a string");
  }
  if (email.length === 0) {
    throw new Error("Email cannot be empty");
  }
  if (!isEmailFormat(email)) {
    throw new Error("Email must be a valid email");
  }
}

const isEmailFormat = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
