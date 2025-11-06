"use client";

import { useRouter } from "next/navigation";

export default function Profil() {
  const router = useRouter();

  return (
    <div className="bg-[#2D2D2D] font-[silkscreen] text-white">
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
              <div className="text-4xl whitespace-nowrap">3 niveaux réussis</div>
            </div>
          </div>

          {/* HTML */}
          <div className="flex items-center space-x-4">
            <img className="w-[20%] h-auto" src="html_logo.png" alt="HTML" />
            <div className="flex flex-col">
              <h3 className="text-white font-semibold text-7xl">HTML</h3>
              <div className="text-4xl text-gray-300">Complété à 30%</div>
              <div className="text-4xl whitespace-nowrap">2 niveaux réussis</div>
            </div>
          </div>

          {/* CSS */}
          <div className="flex items-center space-x-4">
            <img className="w-[20%] h-auto" src="css_logo.png" alt="CSS" />
            <div className="flex flex-col">
              <h3 className="text-white font-semibold text-7xl">CSS</h3>
              <div className="text-4xl text-gray-300">Complété à 20%</div>
              <div className="text-4xl   whitespace-nowrap">1 niveau réussi</div>
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
  );
}
