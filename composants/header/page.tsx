"use client";
import { useEffect, useState, useRef } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showCoursesMenu, setShowCoursesMenu] = useState(false);
  const coursesCloseTimer = useRef<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    authClient.getSession().then((session) => {
      setIsAuthenticated(!!session.data);
      setIsLoading(false);
    });
  }, []);

  // Fermer le menu compte si on clique en dehors
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

  function openCoursesMenu() {
    if (coursesCloseTimer.current) {
      clearTimeout(coursesCloseTimer.current);
      coursesCloseTimer.current = null;
    }
    setShowCoursesMenu(true);
  }

  function scheduleCloseCoursesMenu() {
    if (coursesCloseTimer.current) {
      clearTimeout(coursesCloseTimer.current);
    }
    coursesCloseTimer.current = window.setTimeout(() => {
      setShowCoursesMenu(false);
      coursesCloseTimer.current = null;
    }, 500);
  }

  useEffect(() => {
    return () => {
      if (coursesCloseTimer.current) {
        clearTimeout(coursesCloseTimer.current);
        coursesCloseTimer.current = null;
      }
    };
  }, []);

  async function handleLogout() {
    await authClient.signOut();
    window.location.href = "/";
  }

  if (isLoading) {
    // Afficher un header simple pendant le chargement
    return (
      <div className="grid grid-cols-2 bg-[#1D1D1D] text-white py-3 font-[silkscreen] text-2xl sm:text-3xl lg:text-4xl items-center">
        <Link
          href="/"
          className="flex items-center justify-center cursor-pointer"
        >
          <img className="h-auto w-[40%]" src="/header/logo.png" alt="logo" />
        </Link>
        <div></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Header pour utilisateur non connecté
    return (
      <div className="grid grid-cols-2 bg-[#1D1D1D] text-white py-3 font-[silkscreen] text-2xl sm:text-3xl lg:text-4xl items-center">
        <Link
          href="/"
          className="flex items-center justify-center cursor-pointer"
        >
          <img className="h-auto w-[40%]" src="header/logo.png" alt="logo" />
        </Link>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/sign-in"
            className="text-black outline-[#989AAF] outline-2 border-2 border-[#FFFFFF] rounded bg-[#DADCE7] shadow-[0px_2px_0px_2px_#666880] hover:shadow-none hover:mt-0.5 px-5 text-base sm:text-lg"
          >
            Connexion
          </Link>
          <Link
            href="/sign-up"
            className="text-black outline-[#989AAF] outline-2 border-2 border-[#FFFFFF] rounded bg-[#DADCE7] shadow-[0px_2px_0px_2px_#666880] hover:shadow-none hover:mt-0.5 px-5 text-base sm:text-lg"
          >
            Inscription
          </Link>
        </div>
      </div>
    );
  }

  // Header pour utilisateur connecté
  return (
    <div className="grid grid-cols-5 bg-[#1D1D1D] text-white py-3 font-[silkscreen] text-2xl sm:text-3xl lg:text-4xl items-center">
      <Link
        href="/"
        className="flex items-center justify-center cursor-pointer"
      >
        <img className="h-auto w-[80%]" src="/header/logo.png" alt="logo" />
      </Link>

      {/* Cours (menu déroulant au survol / focus) */}
      <div
        className="relative flex items-center justify-center"
        onMouseEnter={() => openCoursesMenu()}
        onFocus={() => openCoursesMenu()}
        onMouseLeave={() => scheduleCloseCoursesMenu()}
        onBlur={() => scheduleCloseCoursesMenu()}
      >
        <Link
          href="/carte"
          className="flex items-center justify-center gap-2 cursor-pointer hover:text-[#13ADDC] transition"
        >
          <img className="h-auto w-[15%]" src="/header/cours.png" alt="cours" />
          <span className="text-base sm:text-lg lg:text-xl">Mes cours</span>
        </Link>

        {showCoursesMenu && (
          <div className="absolute top-full mt-2 right-1 bg-[#1D1D1D] border-2 border-white rounded-lg shadow-lg z-50 min-w-[160px]">
            <Link
              href="/carte"
              className="block px-4 py-2 text-base text-white hover:bg-[#13ADDC] transition"
              onClick={() => { if (coursesCloseTimer.current) { clearTimeout(coursesCloseTimer.current); coursesCloseTimer.current = null; } setShowCoursesMenu(false); }}
            >
              HTML
            </Link>
            <Link
              href="/carte"
              className="block px-4 py-2 text-base text-white hover:bg-[#13ADDC] transition"
              onClick={() => { if (coursesCloseTimer.current) { clearTimeout(coursesCloseTimer.current); coursesCloseTimer.current = null; } setShowCoursesMenu(false); }}
            >
              CSS
            </Link>
            <Link
              href="/carte"
              className="block px-4 py-2 text-base text-white hover:bg-[#13ADDC] transition rounded-b-lg"
              onClick={() => { if (coursesCloseTimer.current) { clearTimeout(coursesCloseTimer.current); coursesCloseTimer.current = null; } setShowCoursesMenu(false); }}
            >
              Python
            </Link>
          </div>
        )}
      </div>

      {/* Missions (simple link désormais) */}
      <Link
        href="/missions"
        className="flex items-center justify-center gap-2 cursor-pointer hover:text-[#13ADDC] transition"
      >
        <img className="h-auto w-[15%]" src="/header/missions.png" alt="missions" />
        <span className="text-base sm:text-lg lg:text-xl">Missions</span>
        <span className="text-sm sm:text-base">(1/3)</span>
      </Link>

      <Link
        href="/boutique"
        className="flex items-center justify-center gap-2 cursor-pointer hover:text-[#13ADDC] transition"
      >
        <img className="h-auto w-[15%]" src="/header/boutique.png" alt="boutique" />
        <span className="text-base sm:text-lg lg:text-xl">Boutique</span>
      </Link>

      <div className="relative flex items-center justify-center" ref={menuRef}>
        <button
          onClick={() => setShowAccountMenu(!showAccountMenu)}
          className="flex items-center justify-center gap-2 cursor-pointer hover:text-[#13ADDC] transition"
        >
          <p className="text-sm sm:text-lg">350</p>
          <img src="header/coins.png" alt="" />
          <p className="text-sm sm:text-lg">Niveau 17</p>
          <img className="h-auto w-[15%]" src="/header/compte.png" alt="compte" />
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
