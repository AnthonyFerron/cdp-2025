import getUserUrl from "@/app/helpers/getUserUrl";
import { IdCosmetic } from "@/app/types/custom.types";

const userUrl = getUserUrl();

export default async function purchaseCosmetic(
  userId: string,
  idCosmetic: IdCosmetic
): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${userUrl}cosmetic/purchase?userId=${userId}`, {
      method: "POST",
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
        message: (await res.text()) || "Erreur lors de l'achat",
      };
    }
  } catch (err) {
    console.error(err);
    return { success: false, message: "Erreur lors de l'achat" };
  }
}
