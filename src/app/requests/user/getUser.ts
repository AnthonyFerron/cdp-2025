import getUserUrl from "@/app/helpers/getUserUrl";

export default async function getUser(userId: string) {
  const response = await fetch(`${getUserUrl()}/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
}
