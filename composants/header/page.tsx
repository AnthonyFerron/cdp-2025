"use client";

export default function Header() {

  return (
    <div className="grid grid-cols-5 bg-[#1D1D1D] text-white py-3 font-[silkscreen] text-4xl items-center">
      <div className="flex items-center justify-center">
        <img className="h-auto w-[80%]" src="logo.png" alt="logo" />
      </div>
      <div className="flex items-center justify-center gap-2">
        <img className="h-auto w-[15%]" src="cours.png" alt="cours" />
        <span>Mes cours</span>
      </div>
      <div className="flex items-center justify-center gap-2">
        <img className="h-auto w-[15%]" src="missions.png" alt="missions" />
        <span>Missions</span>
      </div>
      <div className="flex items-center justify-center gap-2">
        <img className="h-auto w-[15%]" src="boutique.png" alt="boutique" />
        <span>Boutique</span>
      </div>
      <div className="hidden flex items-center justify-center gap-2">
        <img className="h-auto w-[15%]" src="compte.png" alt="compte" />
        <span>Compte</span>
      </div>
      <div className="flex items-center justify-center gap-2">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <span>350</span>
            <img className="h-auto w-[100%]" src="coins.png" alt="pieces" />
          </div>
          <p>Niveau 3</p>
        </div>
        <img className="h-auto w-[15%]" src="alien_vert.png" alt="compte" />
      </div>
    </div>
  );
}