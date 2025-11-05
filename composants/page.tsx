"use client";
import { useEffect, useState, useRef } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    authClient.getSession().then((session) => {
      setIsAuthenticated(!!session.data);
      setIsLoading(false);
    });
  }, []);

  // Fermer le menu si on clique en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowAccountMenu(false);
      }
    }

    if (showAccountMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showAccountMenu]);

  async function handleLogout() {
    await authClient.signOut();
    window.location.href = "/";
  }

  if (isLoading) {
    // Afficher un header simple pendant le chargement
    return (
      <div className="grid grid-cols-2 bg-[#1D1D1D] text-white py-3 font-[silkscreen] text-4xl items-center">
        <Link
          href="/"
          className="flex items-center justify-center cursor-pointer"
        >
          <img className="h-auto w-[40%]" src="/logo.png" alt="logo" />
        </Link>
        <div></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Header pour utilisateur non connecté
    return (
      <div className="grid grid-cols-2 bg-[#1D1D1D] text-white py-3 font-[silkscreen] text-4xl items-center">
        <Link
          href="/"
          className="flex items-center justify-center cursor-pointer"
        >
          <img className="h-auto w-[40%]" src="/logo.png" alt="logo" />
        </Link>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/sign-in"
            className="text-2xl bg-[#C0C0C0] text-black px-8 py-3 border-4 border-t-white border-l-white border-r-[#404040] border-b-[#404040] hover:bg-[#D0D0D0] transition uppercase tracking-wider"
            style={{
              boxShadow:
                "inset -2px -2px 0px 0px #808080, inset 2px 2px 0px 0px #FFFFFF",
            }}
          >
            Connexion
          </Link>
          <Link
            href="/sign-up"
            className="text-2xl bg-[#C0C0C0] text-black px-8 py-3 border-4 border-t-white border-l-white border-r-[#404040] border-b-[#404040] hover:bg-[#D0D0D0] transition uppercase tracking-wider"
            style={{
              boxShadow:
                "inset -2px -2px 0px 0px #808080, inset 2px 2px 0px 0px #FFFFFF",
            }}
          >
            Inscription
          </Link>
        </div>
      </div>
    );
  }

  // Header pour utilisateur connecté
  return (
    <div className="grid grid-cols-5 bg-[#1D1D1D] text-white py-3 font-[silkscreen] text-4xl items-center">
      <Link
        href="/"
        className="flex items-center justify-center cursor-pointer"
      >
        <img className="h-auto w-[80%]" src="/logo.png" alt="logo" />
      </Link>
      <Link
        href="/cours"
        className="flex items-center justify-center gap-2 cursor-pointer hover:text-[#13ADDC] transition"
      >
        <img className="h-auto w-[15%]" src="/cours.png" alt="cours" />
        <span>Mes cours</span>
      </Link>
      <Link
        href="/missions"
        className="flex items-center justify-center gap-2 cursor-pointer hover:text-[#13ADDC] transition"
      >
        <img className="h-auto w-[15%]" src="/missions.png" alt="missions" />
        <span>Missions</span>
      </Link>
      <Link
        href="/shop"
        className="flex items-center justify-center gap-2 cursor-pointer hover:text-[#13ADDC] transition"
      >
        <img className="h-auto w-[15%]" src="/boutique.png" alt="boutique" />
        <span>Boutique</span>
      </Link>
      <div className="relative flex items-center justify-center" ref={menuRef}>
        <button
          onClick={() => setShowAccountMenu(!showAccountMenu)}
          className="flex items-center justify-center gap-2 cursor-pointer hover:text-[#13ADDC] transition"
        >
          <img className="h-auto w-[15%]" src="/compte.png" alt="compte" />
          <span>Mon Compte</span>
        </button>

        {showAccountMenu && (
          <div className="absolute top-full mt-2 right-0 bg-[#1D1D1D] border-2 border-white rounded-lg shadow-lg z-50 min-w-[250px]">
            <Link
              href="/compte"
              className="block px-6 py-3 text-2xl text-white hover:bg-[#13ADDC] hover:text-white transition rounded-t-lg"
              onClick={() => setShowAccountMenu(false)}
            >
              👤 Mon Compte
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-6 py-3 text-2xl text-white hover:bg-red-600 hover:text-white transition rounded-b-lg"
            >
              🚪 Déconnexion
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
