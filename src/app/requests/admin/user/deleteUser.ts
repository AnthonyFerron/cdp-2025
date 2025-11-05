import getAdminUrl from "@/app/helpers/getAdminUrl";

const adminUrl = getAdminUrl();

type Params = {
  id: string;
};

export default async function deleteUser(data: Params) {
  return await fetch(`${adminUrl}user`, {
    body: JSON.stringify(data),
    method: "DELETE",
  });
}
