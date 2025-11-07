import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const countries = await prisma.country.findMany({
      orderBy: { id_country: "asc" },
    });
    return new Response(JSON.stringify({ countries }), { status: 200 });
  } catch (error) {
    console.error("Error fetching countries:", error);
    return new Response("Failed to fetch countries", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { country } = await request.json();
    const newCountry = await prisma.country.create({
      data: {
        name: country.name,
        image: country.image,
      },
    });
    return new Response(JSON.stringify(newCountry), { status: 201 });
  } catch (error) {
    console.error("Error creating country:", error);
    return new Response("Failed to create country", { status: 500 });
  }
}
