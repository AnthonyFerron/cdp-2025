import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const countries = await prisma.country.findMany({
      orderBy: { id_country: "asc" },
    });
    return new Response(JSON.stringify(countries), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch countries", { status: 500 });
  }
}
