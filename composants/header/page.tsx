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
      <div className="flex items-center justify-center gap-2">
        <img className="h-auto w-[15%]" src="compte.png" alt="compte" />
        <span>Compte</span>
      </div>
    </div>
  );
}
export function HeaderMini() {
  return (
    <div className="grid grid-cols-5 bg-[#1D1D1D] text-white py-3 font-[silkscreen] text-4xl items-center">
      {/* Logo à gauche */}
      <div className="flex items-center justify-center">
        <img className="h-auto w-[80%]" src="logo.png" alt="logo" />
      </div>

      {/* Colonnes vides pour garder la grille */}
      <div></div>
      <div></div>
      <div></div>
      {/* Bouton Connexion tout à droite */}
      <div className="flex items-center justify-end pr-6">
        <button
          type="submit"
          className="text-2xl border p-4 bg-white text-black rounded-lg"
        >
          <a href="/sign-up">inscription</a>
        </button>
        
        <button
          type="submit"
          className="text-2xl border p-4 bg-white text-black rounded-lg"
        >
          <a href="/sign-in">Connexion</a>
        </button>
        </div>
    </div>
  );
}
