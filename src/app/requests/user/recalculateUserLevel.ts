import getUserUrl from "@/app/helpers/getUserUrl";

export default async function recalculateUserLevel(userId: string) {
  const response = await fetch(`${getUserUrl()}/${userId}/calculate-level`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: userId }),
  });

  if (!response.ok) {
    throw new Error("Failed to recalculate user level");
  }

  return response.json();
}
