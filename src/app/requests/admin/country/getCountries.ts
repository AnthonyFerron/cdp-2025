import getAdminUrl from "@/app/helpers/getAdminUrl";
import { ResponseApi } from "@/app/types/api.types";

const adminUrl = getAdminUrl();

type Country = {
  idCountry: number;
  name: string;
  image: string;
};

export default async function getCountries(): ResponseApi<Country[]> {
  const res = await fetch(`${adminUrl}country`, {
    method: "GET",
  });

  if (res.ok) {
    return await res.json();
  }
  return null;
}
