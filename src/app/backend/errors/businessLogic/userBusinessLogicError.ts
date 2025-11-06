export class GetUserWithIdBusinessLogicError extends Error {
  constructor() {
    super("User not found");
    this.name = "GetUserWithIdBusinessLogicError";
  }
}
