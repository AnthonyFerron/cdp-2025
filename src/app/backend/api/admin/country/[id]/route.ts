import CountryBusinessLogic from "@/app/backend/businessLogic/countryBusinessLogic";
import CountryController from "@/app/backend/controller/countryController";
import CountryCrud from "@/app/backend/crud/countryCrud";

const countryCrud = new CountryCrud();
const countryBusinessLogic = new CountryBusinessLogic(countryCrud);
const countryController = new CountryController(countryBusinessLogic);

export const GET = async (req: Request) =>
  countryController.getCountryWithId(req);

export const PUT = async (req: Request) => countryController.updateCountry(req);

export const DELETE = async (req: Request) =>
  countryController.deleteCountry(req);
