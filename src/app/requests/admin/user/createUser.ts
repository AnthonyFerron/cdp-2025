import getAdminUrl from "@/app/helpers/getAdminUrl";

const adminUrl = getAdminUrl();

type Params = {
  id: string;
  name: string;
  email: string;
  emailVerified?: boolean;
  experience?: number;
  levels?: number;
  coins?: number;
  role?: string;
  idCountry: number;
};

export default async function createUser(data: Params) {
  return await fetch(`${adminUrl}user`, {
    body: JSON.stringify(data),
    method: "POST",
  });
}
