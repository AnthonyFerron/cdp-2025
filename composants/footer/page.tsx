"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export function FooterMini() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authClient.getSession().then((session) => {
      setIsAuthenticated(!!session.data);
      setIsLoading(false);
    }).catch(() => {
      setIsAuthenticated(false);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <footer
        className="relative w-full bg-cover bg-no-repeat flex flex-col justify-end pt-20"
        style={{ backgroundImage: "url('/footer-bg.png')", backgroundPosition: 'center top' }}
      >
        <div className="relative z-10 flex flex-col items-start text-left px-6 pb-4 mb-14">
          <img src="logo-m.png" alt="logo" className="w-1/4 mb-4" />
          <p className="text-xs text-black font-[silkscreen]">...</p>
        </div>
      </footer>
    );
  }

  if (!isAuthenticated) {
    // Footer pour utilisateur non connecté
    return (
      <footer
        className="relative w-full bg-cover bg-no-repeat flex flex-col justify-end pt-20"
        style={{ backgroundImage: "url('/footer-bg.png')", backgroundPosition: 'center top' }}
      >
        <div className="relative z-10 flex flex-col items-start text-left px-6 pb-4 mb-14">
          <img src="logo-m.png" alt="logo" className="w-1/4 mb-4" />

          {/* Liens Inscription / Connexion sur la même ligne */}
          <div className="flex items-center gap-2 mb-3">
            <Link href="/sign-up" className="text-2xl text-black">Inscription</Link>
            <span aria-hidden className="mx-3 text-2xl text-black">|</span>
            <Link href="/sign-in" className="text-2xl text-black">Connexion</Link>
          </div>

          <p className="mb-4 text-2xl text-black">
            <Link href="/cgi" className="hover:underline">CGI</Link>
            <span className="mx-3">|</span>
            <Link href="/cgu" className="hover:underline">CGU</Link>
            <span className="mx-3">|</span>
            <Link href="/rgpd" className="hover:underline">RGPD</Link>
          </p>

          <p className="text-xs text-black font-[silkscreen]">
            © 2025 Gamicode. Tous droits réservés.
          </p>
        </div>
      </footer>
    );
  }

  // Footer pour utilisateur connecté — navigation compacte
  return (
    <footer
      className="relative w-full bg-cover bg-no-repeat flex flex-col justify-end pt-20"
      style={{ backgroundImage: "url('/footer-bg.png')", backgroundPosition: 'center top' }}
    >
      <div className="relative z-10 flex flex-col items-start text-left px-6 pb-4 mb-14">

        <img src="logo-m.png" alt="logo" className="w-1/4 mb-4" />

        <div className="mb-4 flex items-center gap-2">
          <Link href="/missions" className="text-2xl text-black">Missions</Link>
          <span aria-hidden className="mx-3 text-2xl text-black">|</span>
          <Link href="/boutique" className="text-2xl text-black">Boutique</Link>
          <span aria-hidden className="mx-3 text-2xl text-black">|</span>
          <Link href="/compte" className="text-2xl text-black">Mon compte</Link>
        </div>

        <p className="mb-4 text-2xl text-black">
          <Link href="/cgi" className="hover:underline">CGI</Link>
          <span className="mx-3">|</span>
          <Link href="/cgu" className="hover:underline">CGU</Link>
          <span className="mx-3">|</span>
          <Link href="/rgpd" className="hover:underline">RGPD</Link>
        </p>

        <p className="text-xs text-black font-[silkscreen]">
          © 2025 Gamicode. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
