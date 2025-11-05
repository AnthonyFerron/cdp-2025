"use server";

import {NextRequest} from "next/server";

export default async function getCosmetics() {
  const url = new URL(
    "/backend/api/cosmetic/",
    process.env.NEXTAUTH_URL
  ).toString();

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(
      `Failed to fetch programming languages (${res.status}): ${res.statusText}`
    );
  }

  const data = await res.json();
  console.log(data);
  return data;
}