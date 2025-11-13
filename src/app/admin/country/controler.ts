import { Country } from "./type";
import getCountriesRequest from "@/app/requests/admin/country/getCountries";
import getCountryRequest from "@/app/requests/admin/country/getCountry";
import createCountryRequest from "@/app/requests/admin/country/createCountry";
import updateCountryRequest from "@/app/requests/admin/country/updateCountry";
import deleteCountryRequest from "@/app/requests/admin/country/deleteCountry";

export async function getCountries(): Promise<Country[]> {
  const data = await getCountriesRequest();
  return data || [];
}

export async function getCountry(id: number): Promise<Country | null> {
  return await getCountryRequest(id);
}

export async function createCountry(country: Country): Promise<Country | null> {
  const res = await createCountryRequest({
    name: country.name,
    image: country.image,
  });

  if (res.ok) {
    return await res.json();
  }
  return null;
}

export async function updateCountry(
  id: number,
  country: Country
): Promise<Country | null> {
  const res = await updateCountryRequest({
    idCountry: id,
    name: country.name,
    image: country.image,
  });

  if (res.ok) {
    return await res.json();
  }
  return null;
}

export async function deleteCountry(id: number): Promise<void> {
  await deleteCountryRequest({ idCountry: id });
}
