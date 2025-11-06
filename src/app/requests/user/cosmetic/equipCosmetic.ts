import getUserUrl from "@/app/helpers/getUserUrl";
import { IdCosmetic } from "@/app/types/custom.types";

const userUrl = getUserUrl();

export default async function equipCosmetic(
  userId: string,
  idCosmetic: IdCosmetic
): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${userUrl}cosmetic/equip?userId=${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idCosmetic }),
    });

    const data = await res.json();

    if (res.ok) {
      return { success: true, message: data.message };
    } else {
      return {
        success: false,
        message: (await res.text()) || "Erreur lors de l'équipement",
      };
    }
  } catch {
    return { success: false, message: "Erreur lors de l'équipement" };
  }
}
