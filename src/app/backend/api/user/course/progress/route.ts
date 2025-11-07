import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const languageId = searchParams.get("languageId");

    if (!languageId) {
      return NextResponse.json({ error: "languageId requis" }, { status: 400 });
    }

    const courseProgress = await prisma.progress.findMany({
      where: {
        user_id: session.user.id,
        Course: {
          id_language: parseInt(languageId),
        },
      },
      include: {
        Course: {
          select: {
            id_course: true,
            difficulty: true,
          },
        },
      },
    });

    const completedCourses = courseProgress.map((p) => ({
      courseId: p.id_course,
      difficulty: p.Course.difficulty,
      progressPoint: p.progress_point,
    }));

    return NextResponse.json({
      completedCourses,
      highestCompletedDifficulty:
        completedCourses.length > 0
          ? Math.max(...completedCourses.map((c) => c.difficulty))
          : 0,
    });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
