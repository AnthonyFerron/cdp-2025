import getUserUrl from "@/app/helpers/getUserUrl";
import { Owned } from "@/app/models/owned.model";
import { ResponseApi } from "@/app/types/api.types";

const userUrl = getUserUrl();

export default async function getOwnedCosmetics(
  userId: string
): ResponseApi<Owned[]> {
  const res = await fetch(`${userUrl}cosmetic/owned?userId=${userId}`, {
    method: "GET",
  });

  if (res.ok) {
    return await res.json();
  }
  return null;
}
