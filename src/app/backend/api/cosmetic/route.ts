import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

export async function GET() {
  try {
    const cosmetics = await prisma.cosmetic.findMany({
      orderBy: { id_cosmetic: "asc" }
    });
    return NextResponse.json(cosmetics);
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// export async function POST(req: NextRequest) {
//   const body = await req.json();
//
//   const { name, type, price, image, is_active } = body;
//
//   if (!name || !type || typeof price !== "number" || !image || typeof is_active !== "boolean") {
//     return NextResponse.json({ error: "Les informations du formulaire sont invalides." }, { status: 400 });
//   }
//
//   try {
//     const newCosmetic = await prisma.cosmetic.create({
//       data: { name, type, price, image, is_active }
//     });
//     return NextResponse.json(newCosmetic, { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Erreur lors de la sauvegarde" }, { status: 500 });
//   }
// }