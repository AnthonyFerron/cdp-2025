"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import Header from "../../../../composants/header/page";
import getCourses from "@/app/requests/user/course/getCourses";
import getUserProgress from "@/app/requests/user/course/getUserProgress";
import { authClient } from "@/lib/auth-client";

interface Niveau {
  id: string;
  libelle: string;
  lien: string;
  x: number;
  y: number;
  difficulty: number;
  isUnlocked: boolean;
  isCompleted: boolean;
}

export default function SelectionNiveauxDynamique() {
  const router = useRouter();
  const params = useParams();
  const language = params.language as string;

  const [niveaux, setNiveaux] = useState<Niveau[]>([]);
  const [loading, setLoading] = useState(true);
  const [languageName, setLanguageName] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const session = await authClient.getSession();
      if (session?.data?.user) {
        setUserId(session.data.user.id);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const loadCourses = async () => {
      if (!userId) return;

      setLoading(true);
      try {
        const languageMap: { [key: string]: { id: number; name: string } } = {
          html: { id: 6, name: "HTML" },
          css: { id: 8, name: "CSS" },
          python: { id: 7, name: "Python" },
        };

        const langInfo = languageMap[language.toLowerCase()];
        if (!langInfo) {
          setLoading(false);
          return;
        }

        setLanguageName(langInfo.name);

        const [courses, progress] = await Promise.all([
          getCourses(),
          getUserProgress(langInfo.id),
        ]);
        if (courses) {
          const filteredCourses = courses.filter(
            (course) => course.idLanguage === langInfo.id && course.isPublished
          );

          const positions = [
            { x: 22.2, y: 75 },
            { x: 35.5, y: 62 },
            { x: 53.3, y: 50 },
            { x: 75.5, y: 50 },
            { x: 89, y: 45 },
            { x: 75.5, y: 25 },
          ];

          const sortedCourses = filteredCourses.sort(
            (a, b) => a.difficulty - b.difficulty
          );

          const completedCourseIds =
            progress?.completedCourses?.map(
              (c: { courseId: number }) => c.courseId
            ) || [];

          const niveauxData: Niveau[] = sortedCourses.map((course, index) => {
            const isCompleted = completedCourseIds.includes(
              Number(course.idCourse)
            );
            const isFirstCourse = index === 0;
            const isPreviousCompleted =
              index > 0 &&
              completedCourseIds.includes(
                Number(sortedCourses[index - 1].idCourse)
              );

            const unlocked = isFirstCourse || isPreviousCompleted;

            return {
              id: course.idCourse.toString(),
              libelle: course.title,
              lien: `/cours?idCourse=${course.idCourse}`,
              x: positions[index % positions.length].x,
              y: positions[index % positions.length].y,
              difficulty: course.difficulty,
              isUnlocked: true,
              isCompleted,
            };
          });

          setNiveaux(niveauxData);
        }
      } catch {
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [language, userId]);

  const allerVers = (niveau: Niveau) => {
    if (niveau.isUnlocked) {
      router.push(niveau.lien);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f14] text-white">
        <Header />
        <div className="flex items-center justify-center h-screen">
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f14] text-white">
      <Header />

      <main className="mx-auto max-w-7xl px-4 pb-16">
        <div className="flex items-center justify-between gap-4 py-4">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            {languageName} - Sélection des niveaux
          </h1>
          <div className="text-sm opacity-80">
            Clique sur un losange pour ouvrir le cours
          </div>
        </div>

        <div
          className="relative w-full overflow-hidden rounded-2xl shadow-xl ring-1 ring-white/10"
          style={{ aspectRatio: "1440 / 1024", background: "#1b2836" }}
        >
          <Image
            src="/selection-niveaux.png"
            alt="Carte de progression des niveaux"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1440px"
            className="object-contain select-none"
            priority
            quality={100}
          />

          {niveaux.map((n) => (
            <PinNiveau
              key={n.id}
              niveau={n}
              onClick={() => allerVers(n)}
              showIndicator={true}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

function PinNiveau({
  niveau,
  onClick,
  showIndicator,
}: {
  niveau: Niveau;
  onClick: () => void;
  showIndicator?: boolean;
}) {
  const { libelle, x, y, isUnlocked, isCompleted } = niveau;

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
    >
      <button
        onClick={onClick}
        disabled={!isUnlocked}
        className={`focus:outline-none relative ${
          isUnlocked ? "cursor-pointer" : "cursor-not-allowed opacity-50"
        }`}
        style={{
          width: "38px",
          height: "38px",
        }}
        aria-label={`Ouvrir le cours ${libelle}`}
        title={`${libelle} ${!isUnlocked ? "(Verrouillé)" : isCompleted ? "(Complété)" : ""}`}
        type="button"
      >
        {showIndicator && !isUnlocked && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-2xl">🔒</span>
          </div>
        )}
        {showIndicator && isCompleted && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-2xl">✓</span>
          </div>
        )}
      </button>
    </div>
  );
}
