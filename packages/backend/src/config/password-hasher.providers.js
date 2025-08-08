import argon2 from "argon2";

export const passwordHasherProviders = {
  passwordHasher: () => argon2,
};
