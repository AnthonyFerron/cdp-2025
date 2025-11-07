import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response("Failed to fetch user", { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { user } = await request.json();

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: {
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified ?? false,
        experience: user.experience ?? 0,
        levels: user.levels ?? 1,
        coins: user.coins ?? 0,
        role: user.role ?? "USER",
        id_country: user.id_country ?? 1,
      },
    });

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response("Failed to update user", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Supprimer toutes les données liées à l'utilisateur en cascade
    await prisma.$transaction(async (tx) => {
      // Supprimer les progrès
      await tx.progress.deleteMany({
        where: { user_id: id },
      });

      // Supprimer les tentatives de quiz (utiliser SQL direct car problème de mapping)
      await tx.$executeRaw`DELETE FROM "Quiz_Attempt" WHERE id_user = ${id}`;

      // Supprimer les tentatives de jeu
      await tx.game_Attempt.deleteMany({
        where: { user_id: id },
      });

      // Supprimer les cosmétiques possédés
      await tx.owned.deleteMany({
        where: { user_id: id },
      });

      // Supprimer les badges gagnés (utiliser SQL direct car problème de mapping)
      await tx.$executeRaw`DELETE FROM earned WHERE id_user = ${id}`;

      // Supprimer les succès obtenus (utiliser SQL direct car problème de mapping)
      await tx.$executeRaw`DELETE FROM achieved WHERE id_user = ${id}`;

      // Supprimer les utilisations
      await tx.used.deleteMany({
        where: { user_id: id },
      });

      // Supprimer les comptes et sessions (si pas de cascade)
      await tx.account.deleteMany({
        where: { userId: id },
      });

      await tx.session.deleteMany({
        where: { userId: id },
      });

      // Enfin, supprimer l'utilisateur
      await tx.user.delete({
        where: { id: id },
      });
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return new Response("Failed to delete user", { status: 500 });
  }
}
