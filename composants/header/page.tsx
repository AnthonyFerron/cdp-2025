"use client";
import { useEffect, useState, useRef } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Nouveaux états / refs pour le menu déroulant placé sur "Cours"
  const [showCoursesMenu, setShowCoursesMenu] = useState(false);
  const [openSubject, setOpenSubject] = useState<"HTML" | "CSS" | "Python" | null>(null);
  const coursesRef = useRef<HTMLDivElement>(null);

  // timeout ref to avoid immediate closing when moving mouse to submenu
  const closeTimeoutRef = useRef<number | null>(null);

  // helper to clear any pending close timeout
  function clearCloseTimeout() {
    if (closeTimeoutRef.current !== null) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }

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

  // Fermer le menu "Cours" si on clique en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (coursesRef.current && !coursesRef.current.contains(event.target as Node)) {
        setShowCoursesMenu(false);
        setOpenSubject(null);
      }
    }

    if (showCoursesMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showCoursesMenu]);

  // cleanup timeout on unmount
  useEffect(() => {
    return () => {
      clearCloseTimeout();
    };
  }, []);

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
          <img className="h-auto w-[40%]" src="/header/logo.png" alt="logo" />
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
          <img className="h-auto w-[40%]" src="header/logo.png" alt="logo" />
        </Link>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/sign-in"
            className="text-black outline-[#989AAF] outline-2 border-2 border-[#FFFFFF] rounded bg-[#DADCE7] shadow-[0px_2px_0px_2px_#666880] hover:shadow-none hover:mt-0.5 px-5"
          >
            Connexion
          </Link>
          <Link
            href="/sign-up"
            className="text-black outline-[#989AAF] outline-2 border-2 border-[#FFFFFF] rounded bg-[#DADCE7] shadow-[0px_2px_0px_2px_#666880] hover:shadow-none hover:mt-0.5 px-5"
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
        <img className="h-auto w-[80%]" src="/header/logo.png" alt="logo" />
      </Link>

      {/* Cours avec menu déroulant au survol */}
      <div
        ref={coursesRef}
        className="relative flex items-center justify-center"
        onMouseEnter={() => {
          clearCloseTimeout();
          setShowCoursesMenu(true);
        }}
        onMouseLeave={() => {
          clearCloseTimeout();
          closeTimeoutRef.current = window.setTimeout(() => {
            setShowCoursesMenu(false);
            setOpenSubject(null);
            closeTimeoutRef.current = null;
          }, 500);
        }}
      >
        <Link
          href=""
          className="flex items-center justify-center gap-2 cursor-pointer hover:text-[#13ADDC] transition"
        >
          <img className="h-auto w-[15%]" src="/header/cours.png" alt="cours" />
          <span>Mes cours</span>
        </Link>

        {showCoursesMenu && (
          <div
            className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-[#1D1D1D] border-2 border-white rounded-lg shadow-lg z-50 p-2 min-w-[260px]"
            onMouseEnter={() => { clearCloseTimeout(); }}
            onMouseLeave={() => {
              clearCloseTimeout();
              closeTimeoutRef.current = window.setTimeout(() => {
                setShowCoursesMenu(false);
                setOpenSubject(null);
                closeTimeoutRef.current = null;
              }, 500);
            }}
          >
            <div className="flex flex-col">
              {/* HTML */}
              <div
                className="relative"
                onMouseEnter={() => setOpenSubject("HTML")}
                onMouseLeave={() => setOpenSubject(null)}
              >
                <button className="w-full text-left px-4 py-2 text-2xl hover:bg-[#13ADDC] rounded">
                  HTML
                </button>
                {openSubject === "HTML" && (
                  <div className="absolute top-0 left-full ml-2 bg-[#1D1D1D] border-2 border-white rounded-lg p-2 min-w-[160px]">
                    <Link href="/html1" className="block px-3 py-1 text-lg hover:bg-gray-700 rounded">Niveau 1</Link>
                    <Link href="/html2" className="block px-3 py-1 text-lg hover:bg-gray-700 rounded">Niveau 2</Link>
                    <Link href="/html3" className="block px-3 py-1 text-lg hover:bg-gray-700 rounded">Niveau 3</Link>
                  </div>
                )}
              </div>

              {/* CSS */}
              <div
                className="relative"
                onMouseEnter={() => setOpenSubject("CSS")}
                onMouseLeave={() => setOpenSubject(null)}
              >
                <button className="w-full text-left px-4 py-2 text-2xl hover:bg-[#13ADDC] rounded">
                  CSS
                </button>
                {openSubject === "CSS" && (
                  <div className="absolute top-0 left-full ml-2 bg-[#1D1D1D] border-2 border-white rounded-lg p-2 min-w-[160px]">
                    <Link href="/css1" className="block px-3 py-1 text-lg hover:bg-gray-700 rounded">Niveau 1</Link>
                    <Link href="/css2" className="block px-3 py-1 text-lg hover:bg-gray-700 rounded">Niveau 2</Link>
                    <Link href="/css3" className="block px-3 py-1 text-lg hover:bg-gray-700 rounded">Niveau 3</Link>
                  </div>
                )}
              </div>

              {/* Python */}
              <div
                className="relative"
                onMouseEnter={() => setOpenSubject("Python")}
                onMouseLeave={() => setOpenSubject(null)}
              >
                <button className="w-full text-left px-4 py-2 text-2xl hover:bg-[#13ADDC] rounded">
                  Python
                </button>
                {openSubject === "Python" && (
                  <div className="absolute top-0 left-full ml-2 bg-[#1D1D1D] border-2 border-white rounded-lg p-2 min-w-[160px]">
                    <Link href="/python1" className="block px-3 py-1 text-lg hover:bg-gray-700 rounded">Niveau 1</Link>
                    <Link href="/python2" className="block px-3 py-1 text-lg hover:bg-gray-700 rounded">Niveau 2</Link>
                    <Link href="/python3" className="block px-3 py-1 text-lg hover:bg-gray-700 rounded">Niveau 3</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Missions (simple link désormais) */}
      <Link
        href="/missions"
        className="flex items-center justify-center gap-2 cursor-pointer hover:text-[#13ADDC] transition"
      >
        <img className="h-auto w-[15%]" src="/header/missions.png" alt="missions" />
        <span>Missions</span>
        <span>(1/3)</span>
      </Link>

      <Link
        href="/boutique"
        className="flex items-center justify-center gap-2 cursor-pointer hover:text-[#13ADDC] transition"
      >
        <img className="h-auto w-[15%]" src="/header/boutique.png" alt="boutique" />
        <span>Boutique</span>
      </Link>

      <div className="relative flex items-center justify-center" ref={menuRef}>
        <button
          onClick={() => setShowAccountMenu(!showAccountMenu)}
          className="flex items-center justify-center gap-2 cursor-pointer hover:text-[#13ADDC] transition"
        >
          <p className="text-lg">350</p>
          <img src="header/coins.png" alt="" />
          <p className="text-lg">Niveau 17</p>
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
