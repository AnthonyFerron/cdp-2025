import { NextResponse } from "next/server";
import CountryBusinessLogic from "../businessLogic/countryBusinessLogic";
import {
  Country,
  CountryCreateDto,
  CountryUpdateDto,
  CountryDeleteDto,
} from "../models/country/country.model";
import { GetCountryWithIdBusinessLogicError } from "../errors/businessLogic/countryBusinessLogicError";
import { IdCountry } from "../types/custom.types";

export default class CountryController {
  constructor(private readonly countryBusinessLogic: CountryBusinessLogic) {}

  async createCountry(req: Request) {
    try {
      const { name, image }: CountryCreateDto = await req.json();

      if (
        name &&
        typeof name === "string" &&
        image &&
        typeof image === "string"
      ) {
        await this.countryBusinessLogic.createCountry(name, image);
        return new NextResponse(null, { status: 200 });
      } else {
        return new NextResponse("Les champs sont incomplets", { status: 400 });
      }
    } catch (err) {
      console.error(err);
      return new NextResponse("Erreur serveur", { status: 500 });
    }
  }

  async updateCountry(req: Request) {
    try {
      const { idCountry, name, image }: CountryUpdateDto = await req.json();

      if (
        idCountry &&
        typeof idCountry === "number" &&
        name &&
        typeof name === "string" &&
        image &&
        typeof image === "string"
      ) {
        await this.countryBusinessLogic.updateCountry(
          idCountry as IdCountry,
          name,
          image
        );
        return new NextResponse(null, { status: 200 });
      } else {
        return new NextResponse("Les champs sont incomplets", { status: 400 });
      }
    } catch (err) {
      console.error(err);
      return new NextResponse("Erreur serveur", { status: 500 });
    }
  }

  async deleteCountry(req: Request) {
    try {
      const { idCountry }: CountryDeleteDto = await req.json();

      if (idCountry && typeof idCountry === "number") {
        await this.countryBusinessLogic.deleteCountry(idCountry);
        return new NextResponse(null, { status: 200 });
      } else {
        return new NextResponse("L'id du pays est incorrect", { status: 400 });
      }
    } catch (err) {
      console.error(err);
      return new NextResponse("Erreur serveur", { status: 500 });
    }
  }

  async getCountryWithId(req: Request) {
    try {
      const url = new URL(req.url);
      const idCountry: unknown = url.searchParams.get("id");

      if (idCountry && typeof idCountry === "string") {
        const country = await this.countryBusinessLogic.getCountryWithId(
          parseInt(idCountry) as IdCountry
        );
        return NextResponse.json<Country>(country, { status: 200 });
      } else {
        return new NextResponse("L'id du pays est incorrect", { status: 400 });
      }
    } catch (err) {
      if (err instanceof GetCountryWithIdBusinessLogicError) {
        return new NextResponse("L'id du pays est incorrect", { status: 400 });
      } else {
        console.error(err);
        return new NextResponse("Erreur serveur", { status: 500 });
      }
    }
  }

  async getCountries() {
    try {
      const countries = await this.countryBusinessLogic.getCountries();
      return NextResponse.json<Country[]>(countries, { status: 200 });
    } catch (err) {
      console.error(err);
      return new NextResponse("Erreur serveur", { status: 500 });
    }
  }
}
