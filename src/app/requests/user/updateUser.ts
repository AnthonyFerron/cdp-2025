import getUserUrl from "@/app/helpers/getUserUrl";

type UpdateUserData = {
  name?: string;
  email?: string;
  id_country?: number;
};

export default async function updateUser(
  userId: string,
  userData: UpdateUserData
) {
  const response = await fetch(`${getUserUrl()}/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: userData }),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return response.json();
}
