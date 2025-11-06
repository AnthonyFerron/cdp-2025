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

    if (res.ok) {
      const data = await res.json();
      return { success: true, message: data.message };
    } else {
      const errorMessage = await res.text();
      return {
        success: false,
        message: errorMessage || "Erreur lors de l'achat",
      };
    }
  } catch {
    return { success: false, message: "Erreur lors de l'achat" };
  }
}
