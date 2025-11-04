import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma =
  global.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
  });
if (!global.prisma) global.prisma = prisma;

export async function GET() {
  try {
    const items = await prisma.programming_Language.findMany({
      orderBy: { id_language: "asc" },
    });
    console.log("Fetched programming languages:", items);
    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching programming languages:", error);
    return NextResponse.json(
      { error: "Server error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
