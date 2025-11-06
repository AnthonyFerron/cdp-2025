import getAdminUrl from "@/app/helpers/getAdminUrl";

const adminUrl = getAdminUrl();

type Params = {
  idCountry: number;
  name: string;
  image: string;
};

export default async function updateCountry(data: Params) {
  return await fetch(`${adminUrl}country`, {
    body: JSON.stringify(data),
    method: "PUT",
  });
}
