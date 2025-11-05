import { Country } from "./type";

export async function getCountries(): Promise<Country[]> {
  const res = await fetch("/backend/api/country");
  const data = await res.json();
  return data.countries as Country[];
}

export async function getCountry(id: number): Promise<Country> {
  const res = await fetch(`/backend/api/country/${id}`);
  const data = await res.json();
  return data as Country;
}

export async function createCountry(country: Country): Promise<Country> {
  const res = await fetch("/backend/api/country", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ country }),
  });
  const data = await res.json();
  return data as Country;
}

export async function updateCountry(
  id: number,
  country: Country
): Promise<Country> {
  const res = await fetch(`/backend/api/country/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ country }),
  });
  const data = await res.json();
  return data as Country;
}

export async function deleteCountry(id: number): Promise<void> {
  await fetch(`/backend/api/country/${id}`, {
    method: "DELETE",
  });
}
