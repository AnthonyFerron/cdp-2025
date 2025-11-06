"use client";

import { useRouter } from "next/navigation";

export default function Profil() {
  const router = useRouter();

  // ajout des données de progression
  const level = 1;
  const currentXP = 120;
  const nextLevelXP = 200;
  const progressPercent = Math.min(100, Math.floor((currentXP / nextLevelXP) * 100));

  return (
    <div className="font-[silkscreen]">
      <div className="bg-[url(/fond1.png)] w-full h-[200px] bg-cover">
        <div className="grid grid-cols-5 h-full">
          <div className="col-span-2 flex justify-center items-end gap-4 pb-4">
            <img className="w-12 h-auto block" src="bronze_css.png" alt="" />
            <img className="w-12 h-auto block" src="silver_css.png" alt="" />
            <img className="w-12 h-auto block" src="gold_css.png" alt="" />
          </div>

          {/* --- remplacé : mettre la barre au bas de la colonne de droite --- */}
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
          {/* --- fin remplacement --- */}
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
            <span className="whitespace-nowrap text-5xl">Solid Snake</span>
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
        <div className="p-4">
          <h2 className="underline text-white text-7xl mb-10">Progression</h2>

          <div className="grid grid-cols-3 text-white gap-4">
            {/* Python */}
            <div className="flex items-center space-x-4">
              <img
                className="w-[20%] h-auto"
                src="python_logo.png"
                alt="Python"
              />
              <div className="flex flex-col">
                <h3 className="text-white font-semibold text-7xl">Python</h3>
                <div className="text-4xl text-gray-300">Complété à 50%</div>
                <div className="text-4xl text-gray-300">3 niveaux réussis</div>
              </div>
            </div>

            {/* HTML */}
            <div className="flex items-center space-x-4">
              <img className="w-[20%] h-auto" src="html_logo.png" alt="HTML" />
              <div className="flex flex-col">
                <h3 className="text-white font-semibold text-7xl">HTML</h3>
                <div className="text-4xl text-gray-300">Complété à 30%</div>
                <div className="text-4xl text-gray-300">2 niveaux réussis</div>
              </div>
            </div>

            {/* CSS */}
            <div className="flex items-center space-x-4">
              <img className="w-[20%] h-auto" src="css_logo.png" alt="CSS" />
              <div className="flex flex-col">
                <h3 className="text-white font-semibold text-7xl">CSS</h3>
                <div className="text-4xl text-gray-300">Complété à 20%</div>
                <div className="text-4xl text-gray-300">1 niveau réussi</div>
              </div>
            </div>
          </div>
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
