import getUserUrl from "@/app/helpers/getUserUrl";

export default async function deleteUser(userId: string) {
  const response = await fetch(`${getUserUrl()}/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }

  return response.json();
}
