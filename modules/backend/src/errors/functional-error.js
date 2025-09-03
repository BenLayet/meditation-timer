export class FunctionalError extends Error {
  name = "FunctionalError";
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}
