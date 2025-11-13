export class GetCountryWithIdBusinessLogicError extends Error {
  constructor() {
    super("Country not found");
    this.name = "GetCountryWithIdBusinessLogicError";
  }
}
