"use client";

export default function Footer() {
  return (
    <footer
      className="relative w-full h-64 bg-cover bg-left-bottom bg-no-repeat flex flex-col justify-end"
      style={{ backgroundImage: "url('/footer-bg.png')" }}
    >
      {/* Contenu du footer, tout aligné à gauche */}
      <div className="relative z-10 flex flex-col items-start text-left px-10 pb-6 mb-14">

       

        {/* Navigation */}
        <div className="">
            <img src="logo-m.png" alt="logo" className="w-42" />
          <h3 className="text-2xl mb-2 text-black font-[silkscreen]">Navigation</h3>
          <p>
            <a href="/acceuil" className="text-black hover:underline">Accueil</a>
            <a href="/cours" className="text-black hover:underline"> Cours</a>
            <a href="/missions" className="text-black hover:underline"> Missions</a>
            <a href="/boutique" className="text-black hover:underline"> Boutique</a>
          </p>
        </div>

        {/* Copyright */}
        <p className="text-sm text-black font-[silkscreen]">
          © 2025 MonProjet. Tous droits réservés.
        </p>

      </div>
    </footer>
  );
}
export function FooterMini() {
  return (
    <footer
      className="relative w-full h-48 bg-cover bg-left-bottom bg-no-repeat flex flex-col justify-end "
      style={{ backgroundImage: "url('/footer-bg.png')"  }} 
    >
      <div className="relative z-10 flex flex-col items-start text-left px-6 pb-4 mb-14">

        {/* Logo plus petit */}
        <img src="logo-m.png" alt="logo" className="w-42" />

        {/* Liens essentiels */}
        <p>
          <a href="/sign-up"className="text-black hover:underline">inscription </a>
          <a href="/sign-in"className="text-black hover:underline">Connexion</a><br />
          <a href="/rgpd"className="text-black hover:underline"> Politique de confidentialité</a><br />
          <a href="/cgu"className="text-black hover:underline"> condition d'utilisation</a>
        </p>

        {/* Copyright compact */}
        <p className="text-xs text-black font-[silkscreen]">
          © 2025 MonProjet. Tous droits réservés.
        </p>

      </div>
    </footer>
  );
}
