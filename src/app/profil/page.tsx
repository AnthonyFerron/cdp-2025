"use client";

export default function Profil() {
  return (
    <div className="bg-[#2D2D2D]">
      <div className="p-4">
        <h2 className="underline text-white text-7xl mb-10">Progression</h2>
        <div className="grid grid-cols-3 text-white gap-4">
          {/* Python */}
          <div className="flex items-center space-x-4">
            <img className="w-[20%] h-auto" src="python_logo.png" alt="Python" />
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
      <img className="w-full h-auto mt-[10%]" src="fond_alien_vert.png" alt="" />
    </div>
  );
}
