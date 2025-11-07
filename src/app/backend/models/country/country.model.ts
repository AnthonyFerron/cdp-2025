import { IdCountry } from "../../types/custom.types";

export type CountryDB = {
  id_country: number;
  name: string;
  image: string;
};

export type Country = {
  idCountry: IdCountry;
  name: string;
  image: string;
};

export type CountryCreateDto = {
  name?: unknown;
  image?: unknown;
};

export type CountryUpdateDto = {
  idCountry?: unknown;
  name?: unknown;
  image?: unknown;
};

export type CountryDeleteDto = {
  idCountry?: IdCountry;
};
