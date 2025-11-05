import CountryCrud from "../crud/countryCrud";
import { IdCountry } from "../types/custom.types";
import CountryTransformer from "../models/country/countryTransformer";
import { GetCountryWithIdBusinessLogicError } from "../errors/businessLogic/countryBusinessLogicError";
import { Country } from "../models/country/country.model";

export default class CountryBusinessLogic {
  constructor(private readonly countryCrud: CountryCrud) {}

  async createCountry(name: string, image: string) {
    await this.countryCrud.createCountry(name, image);
  }

  async updateCountry(idCountry: IdCountry, name: string, image: string) {
    await this.countryCrud.updateCountry(idCountry, name, image);
  }

  async deleteCountry(idCountry: IdCountry) {
    await this.countryCrud.deleteCountry(idCountry);
  }

  async getCountryWithId(idCountry: IdCountry): Promise<Country> {
    const countryDb = await this.countryCrud.getCountryWithId(idCountry);
    if (countryDb) {
      return CountryTransformer.DbToApi(countryDb);
    }
    throw new GetCountryWithIdBusinessLogicError();
  }

  async getCountries(): Promise<Country[]> {
    const countriesDb = await this.countryCrud.getCountries();
    return countriesDb.map((country) => CountryTransformer.DbToApi(country));
  }
}
