import getAdminUrl from "@/app/helpers/getAdminUrl";

const adminUrl = getAdminUrl();

type Params = {
  idCountry: number;
};

export default async function deleteCountry(data: Params) {
  return await fetch(`${adminUrl}country`, {
    body: JSON.stringify(data),
    method: "DELETE",
  });
}
