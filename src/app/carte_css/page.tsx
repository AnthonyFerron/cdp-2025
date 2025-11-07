"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "../../../composants/header/page";

interface Niveau {
  id: string;
  libelle: string;
  lien: string;
  x: number;
  y: number;
}

export default function SelectionNiveaux({
  carteSrc = "/selection-niveaux.png",
  niveaux = niveauxParDefaut,
}: {
  carteSrc?: string;
  niveaux?: Niveau[];
}) {
  const router = useRouter();

  const allerVers = (lien: string) => {
    router.push(lien);
  };

  return (
    <div className="min-h-screen bg-[#0a0f14] text-white">
      <Header />

      <main className="mx-auto max-w-7xl px-4 pb-16">
        <div className="flex items-center justify-between gap-4 py-4">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Sélection des niveaux</h1>
          <div className="text-sm opacity-80">Clique sur un losange pour ouvrir le cours</div>
        </div>

        <div
          className="relative w-full overflow-hidden rounded-2xl shadow-xl ring-1 ring-white/10"
          style={{ aspectRatio: "1440 / 1024", background: "#1b2836" }}
        >
          <Image
            src={carteSrc}
            alt="Carte de progression des niveaux"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1440px"
            className="object-contain select-none"
            priority
            quality={100}
          />

          {niveaux.map((n) => (
            <PinNiveau key={n.id} niveau={n} onClick={() => allerVers(n.lien)} />
          ))}
        </div>
      </main>
    </div>
  );
}

function PinNiveau({ niveau, onClick }: { niveau: Niveau; onClick: () => void }) {
  const { libelle, x, y } = niveau;

  return (
    <button
      onClick={onClick}
      className="absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
      style={{ 
        left: `${x}%`, 
        top: `${y}%`,
        width: '38px',
        height: '38px',
        opacity: 0,
      }}
      aria-label={`Ouvrir le cours ${libelle}`}
      title={libelle}
      type="button"
    />
  );
}

const niveauxParDefaut: Niveau[] = [
  { id: "css1", libelle: "Niveau 1", lien: "/cours/css1", x: 22.2, y: 75 },
  { id: "css2", libelle: "Niveau 2", lien: "/cours/css2", x: 35.5, y: 62 },
  { id: "css3", libelle: "Niveau 3", lien: "/cours/css3", x: 53.3, y: 50 },
  { id: "css4", libelle: "Niveau 4", lien: "/cours/css4", x: 75.5, y: 50 },
  { id: "css5", libelle: "Niveau 5", lien: "/cours/css5", x: 89, y: 45 },
  { id: "css6", libelle: "Niveau 6", lien: "/cours/css6", x: 75.5, y: 25 },
];