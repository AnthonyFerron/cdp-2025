import CountryBusinessLogic from "@/app/backend/businessLogic/countryBusinessLogic";
import CountryController from "@/app/backend/controller/countryController";
import CountryCrud from "@/app/backend/crud/countryCrud";

const countryCrud = new CountryCrud();
const countryBusinessLogic = new CountryBusinessLogic(countryCrud);
const countryController = new CountryController(countryBusinessLogic);

export const GET = async () => countryController.getCountries();

export const POST = async (req: Request) =>
  countryController.createCountry(req);
