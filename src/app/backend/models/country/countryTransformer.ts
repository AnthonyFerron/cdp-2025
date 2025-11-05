import { IdCountry } from "../../types/custom.types";
import { Country, CountryDB } from "./country.model";

export default class CountryTransformer {
  static DbToApi(data: CountryDB): Country {
    return {
      idCountry: data.id_country as IdCountry,
      name: data.name,
      image: data.image,
    };
  }
}
