import CrudError from "../errors/crudError";
import { CountryDB } from "../models/country/country.model";
import { IdCountry } from "../types/custom.types";
import ConfigCrud from "./configCrud";

export default class CountryCrud extends ConfigCrud {
  async createCountry(name: string, image: string) {
    try {
      await this.prisma.country.create({
        data: {
          name,
          image,
        },
      });
    } catch (err) {
      throw new CrudError("createCountry", String(err));
    }
  }

  async updateCountry(idCountry: IdCountry, name: string, image: string) {
    try {
      await this.prisma.country.update({
        where: {
          id_country: idCountry,
        },
        data: {
          name,
          image,
        },
      });
    } catch (err) {
      throw new CrudError("updateCountry", String(err));
    }
  }

  async deleteCountry(idCountry: IdCountry) {
    try {
      await this.prisma.country.delete({
        where: {
          id_country: idCountry,
        },
      });
    } catch (err) {
      throw new CrudError("deleteCountry", String(err));
    }
  }

  async getCountryWithId(idCountry: IdCountry): Promise<CountryDB | null> {
    try {
      return await this.prisma.country.findUnique({
        where: {
          id_country: idCountry,
        },
      });
    } catch (err) {
      throw new CrudError("getCountryWithId", String(err));
    }
  }

  async getCountries(): Promise<CountryDB[]> {
    try {
      return await this.prisma.country.findMany({
        orderBy: { id_country: "asc" },
      });
    } catch (err) {
      throw new CrudError("getCountries", String(err));
    }
  }
}
