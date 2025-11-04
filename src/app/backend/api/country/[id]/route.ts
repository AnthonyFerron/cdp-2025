import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const countryId = parseInt(id);
    const country = await prisma.country.findUnique({
      where: { id_country: countryId },
    });

    if (!country) {
      return new Response("Country not found", { status: 404 });
    }

    return new Response(JSON.stringify(country), { status: 200 });
  } catch (error) {
    console.error("Error fetching country:", error);
    return new Response("Failed to fetch country", { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const countryId = parseInt(id);
    const { country } = await request.json();

    const updatedCountry = await prisma.country.update({
      where: { id_country: countryId },
      data: {
        name: country.name,
        image: country.image,
      },
    });

    return new Response(JSON.stringify(updatedCountry), { status: 200 });
  } catch (error) {
    console.error("Error updating country:", error);
    return new Response("Failed to update country", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const countryId = parseInt(id);

    await prisma.country.delete({
      where: { id_country: countryId },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error deleting country:", error);
    return new Response("Failed to delete country", { status: 500 });
  }
}
