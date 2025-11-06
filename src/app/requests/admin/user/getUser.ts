import getAdminUrl from "@/app/helpers/getAdminUrl";
import { ResponseApi } from "@/app/types/api.types";

const adminUrl = getAdminUrl();

type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  experience: number;
  levels: number;
  coins: number;
  role: string;
  idCountry: number;
  createAt: Date;
};

export default async function getUser(id: string): ResponseApi<User> {
  const res = await fetch(`${adminUrl}user?id=${id}`, {
    method: "GET",
  });

  if (res.ok) {
    return await res.json();
  }
  return null;
}
