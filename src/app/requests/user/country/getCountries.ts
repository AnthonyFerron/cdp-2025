import getUserUrl from "@/app/helpers/getUserUrl";

export default async function getCountries() {
  const response = await fetch(`${getUserUrl()}/country`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }

  return response.json();
}
