import getAdminUrl from "@/app/helpers/getAdminUrl";

const adminUrl = getAdminUrl();

type Params = {
  name: string;
  image: string;
};

export default async function createCountry(data: Params) {
  return await fetch(`${adminUrl}country`, {
    body: JSON.stringify(data),
    method: "POST",
  });
}
