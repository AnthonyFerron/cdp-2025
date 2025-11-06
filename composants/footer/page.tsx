"use client";

export function FooterMini() {
  return (
    <footer
      className="relative w-full  bg-cover bg-no-repeat flex flex-col justify-end pt-20"
      style={{ backgroundImage: "url('/footer-bg.png')", backgroundPosition: 'center top' }} 
    >
      <div className="relative z-10 flex flex-col items-start text-left px-6 pb-4 mb-14">

        {/* Logo plus petit */}
        <img src="logo-m.png" alt="logo" className="w-1/4 mb-4" />

        {/* Liens essentiels */}
        <p>
          <a href="/sign-up"className="text-black hover:underline">inscription </a>
          <a href="/sign-in"className="text-black hover:underline">Connexion</a><br />
          <a href="/rgpd"className="text-black hover:underline"> Politique de confidentialité</a><br />
          <a href="/cgu"className="text-black hover:underline"> condition d'utilisation</a>
        </p>

        {/* Copyright compact */}
        <p className="text-xs text-black font-[silkscreen]">
          © 2025 Gamicode. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
