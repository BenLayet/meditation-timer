export class FunctionalError extends Error {
  name = "FunctionalError";
  code: string;
  
  constructor(message: string, code: string) {
    super(message);
    this.code = code;
  }
}
