"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Profil() {
  const router = useRouter();

  // ajout des données de progression
  const level = 1;
  const currentXP = 120;
  const nextLevelXP = 200;
  const progressPercent = Math.min(100, Math.floor((currentXP / nextLevelXP) * 100));

  // --- modification : état pour la bannière sélectionnée ---
  const banners = [
    "cosmetiques/bannieres/banniere1.png",
    "cosmetiques/bannieres/banniere2.png",
    "cosmetiques/bannieres/banniere3.png",
    "cosmetiques/bannieres/banniere4.png",
    "cosmetiques/bannieres/banniere5.png",
  ];
  const [selectedIndex, setSelectedIndex] = useState(0);

  // nouvel état pour l'URL du background en haut
  const [backgroundUrl, setBackgroundUrl] = useState("/fond1.png");

  const prev = () => setSelectedIndex((s) => Math.max(0, s - 1));
  const next = () => setSelectedIndex((s) => Math.min(banners.length - 1, s + 1));
  // --- fin modification ---

  return (
    <div className="font-[silkscreen]">
      <div
        className="w-full h-[200px] bg-cover"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      >
        <div className="grid grid-cols-5 h-full">
          <div className="col-span-2 flex justify-center items-end gap-4 pb-4">
            <img className="w-12 h-auto block" src="bronze_css.png" alt="" />
            <img className="w-12 h-auto block" src="silver_css.png" alt="" />
            <img className="w-12 h-auto block" src="gold_css.png" alt="" />
          </div>

          <div className="col-span-3 flex items-end pb-4">
            <div className="w-full">
              <div className="rounded-lg p-3">
                <div className="flex items-center justify-between mb-2 px-1">
                  <div className="text-2xl text-[#53AFE9] font-semibold">Niveau {level}</div>
                  <div className="text-2xl text-[#53AFE9]">
                    {currentXP} XP / {nextLevelXP} XP
                  </div>
                </div>

                <div className="w-full bg-gray-700 rounded-xl h-4 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-lime-400 transition-all"
                    style={{ width: `${progressPercent}%` }}
                    role="progressbar"
                    aria-valuenow={progressPercent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#2D2D2D] text-white">
        <div className="w-full flex items-center justify-between px-[5%] pt-4">
          <div className="flex items-center">
            <img
              className="inline w-[25%] h-auto object-contain shrink-0 mr-4"
              src="alien_vert.png"
              alt=""
            />
            <span className="whitespace-nowrap text-6xl">Solid Snake</span>
          </div>
          <button
            type="button"
            onClick={() => router.push("/edit")}
            className="text-black text-3xl cursor-pointer transition-all bg-[#DADCE7] px-6 py-2 rounded-lg
          border-[#666880]
          border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
          active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
          >
            Modifier le profil
          </button>
        </div>
        <div className="p-4 hidden">
          <h2 className="underline text-white text-6xl mb-10">Progression</h2>

          <div className="grid grid-cols-3 text-white gap-4">
            {/* Python */}
            <div className="flex items-center space-x-4">
              <img
                className="w-[20%] h-auto"
                src="python_logo.png"
                alt="Python"
              />
              <div className="flex flex-col">
                <h3 className="text-white font-semibold text-5xl">Python</h3>
                <div className="text-4xl text-gray-300">Complété à 50%</div>
                <div className="text-4xl text-gray-300">3 niveaux réussis</div>
              </div>
            </div>

            {/* HTML */}
            <div className="flex items-center space-x-4">
              <img className="w-[20%] h-auto" src="html_logo.png" alt="HTML" />
              <div className="flex flex-col">
                <h3 className="text-white font-semibold text-5xl">HTML</h3>
                <div className="text-4xl text-gray-300">Complété à 30%</div>
                <div className="text-4xl text-gray-300">2 niveaux réussis</div>
              </div>
            </div>

            {/* CSS */}
            <div className="flex items-center space-x-4">
              <img className="w-[20%] h-auto" src="css_logo.png" alt="CSS" />
              <div className="flex flex-col">
                <h3 className="text-white font-semibold text-5xl">CSS</h3>
                <div className="text-4xl text-gray-300">Complété à 20%</div>
                <div className="text-4xl text-gray-300">1 niveau réussi</div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 text-center mt-4">
          <div></div>
          <div className="grid grid-cols-2 text-3xl">
            <button>Inventaire</button>
            <button>Informations</button></div>
          <div></div>
        </div>
        {/* Remplacement de la grille statique par un carousel montrant 3 bannières */}
        <h2 className="ml-4 text-3xl underline">Bannières</h2>
        <div className="flex items-center justify-center gap-4 p-6">
          <button
            onClick={prev}
            aria-label="Précédent"
            disabled={selectedIndex === 0}
            className="text-4xl px-3 py-1 bg-[#DADCE7] text-black rounded disabled:opacity-40"
          >
            ‹
          </button>

          <div className="flex overflow-hidden w-[80%] justify-center">
            <div className="flex gap-6 w-full justify-center">
              {/*
                Afficher toujours 3 "slots" : gauche, centre (selectedIndex), droite.
                Si on est en bord, on insère un placeholder pour conserver le centre.
              */}
              {[selectedIndex - 1, selectedIndex, selectedIndex + 1].map((i, slotIdx) => {
                if (i === undefined || i < 0 || i >= banners.length) {
                  // placeholder (vide) pour garder l'image sélectionnée au centre aux extrémités
                  return (
                    <div key={`ph-${slotIdx}`} className="w-1/3 flex items-center justify-center">
                      <div className="max-h-40 w-full" />
                    </div>
                  );
                }

                const src = banners[i];
                const isSelected = i === selectedIndex;
                return (
                  <div key={src} className="w-1/3 flex items-center justify-center">
                    <img
                      src={src}
                      alt={`Bannière ${i + 1}`}
                      onClick={() => setSelectedIndex(i)}
                      className={
                        "max-h-40 object-contain cursor-pointer" +
                        (isSelected ? "scale-110" : "")
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={next}
            aria-label="Suivant"
            disabled={selectedIndex === banners.length - 1}
            className="text-4xl px-3 py-1 bg-[#DADCE7] text-black rounded disabled:opacity-40"
          >
            ›
          </button>
        </div>
        <div className="text-center">
          <button
            className="text-3xl"
            onClick={() => {
              const raw = banners[selectedIndex];
              const url = raw ? (raw.startsWith("/") ? raw : "/" + raw) : backgroundUrl;
              setBackgroundUrl(url);
            }}
          >
            Appliquer
          </button>
        </div>


        <img
          className="w-full h-auto mt-[10%]"
          src="fond_alien_vert.png"
          alt=""
        />
      </div>
    </div>
  );
}
