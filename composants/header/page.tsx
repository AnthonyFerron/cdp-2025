"use client";
import { useEffect, useState, useRef } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";
import getOwnedCosmetics from "@/app/requests/user/cosmetic/getOwnedCosmetics";
import {Owned} from "@/app/models/owned.model";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showCoursesMenu, setShowCoursesMenu] = useState(false);
  const coursesCloseTimer = useRef<number | null>(null);
  const [userCoins, setUserCoins] = useState<number>(0);
  const [userLevel, setUserLevel] = useState<number>(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [ownedCosmetics, setOwnedCosmetics] = useState<Owned[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const session = await authClient.getSession();
      setIsAuthenticated(!!session.data);

      if (session.data?.user) {
        const userRes = await fetch(
          `/backend/api/user/${session.data.user.id}`
        );
        if (userRes.ok) {
          const userData = await userRes.json();
          setUserCoins(userData.coins || 0);
          setUserLevel(userData.levels || 0);
        }
      }

      setIsLoading(false);
    };

    fetchUserData();
  }, []);

  const loadOwnedCosmetics = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const owned = await getOwnedCosmetics(userId);
      if (owned) {
        setOwnedCosmetics(owned);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  type UserData = {
    id: string;
    name: string;
    email: string;
    experience: number;
    levels: number;
    coins: number;
    id_country: number;
  };

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

  const getImagePath = (imagePath: string) => {
    if (!imagePath) return "";

    // Si le chemin commence par /public/, le remplacer par /
    if (imagePath.startsWith("/public/")) {
      return imagePath.replace("/public/", "/");
    }

    // Si le chemin commence par public/ (sans /), ajouter /
    if (imagePath.startsWith("public/")) {
      return "/" + imagePath.replace("public/", "");
    }

    // Si le chemin ne commence pas par /, l'ajouter
    if (!imagePath.startsWith("/")) {
      return "/" + imagePath;
    }

    return imagePath;
  };

  const ownedAvatars = ownedCosmetics
    .filter((item) => item.Cosmetic?.type === "AVATAR")
    .map((item) => ({
      id: item.idCosmetic,
      image: getImagePath(item.Cosmetic?.image || ""),
      isEquiped: item.isEquiped,
      name: item.Cosmetic?.name || "",
    }));

  const equippedAvatar =
    ownedAvatars.find((a) => a.isEquiped)?.image ||
    ownedAvatars[0]?.image ||
    "/cosmetics/avatars/alien_vert.png";

  const [selectedAvatar, setSelectedAvatar] = useState(equippedAvatar);

  async function handleLogout() {
    await authClient.signOut();
    window.location.href = "/";
  }

  loadOwnedCosmetics()

  const getProfileAvatarPath = (avatarPath: string): string => {
    const mapping: { [key: string]: string } = {
      alien_vert: "alienGreen",
      alien_bleu: "alienBlue",
      alien_beige: "alienBeige",
      alien_rose: "alienPink",
      alien_jaune: "alienYellow",
    };

    for (const [key, value] of Object.entries(mapping)) {
      if (avatarPath.includes(key)) {
        return `/profil/avatars/${value}Profil.png`;
      }
    }

    // Par défaut, retourner l'avatar vert de profil
    return "/profil/avatars/alienGreenProfil.png";
  };

  const getAvatarColor = (avatarPath: string): string => {
    const mapping: { [key: string]: string } = {
      alien_vert: "Green",
      alien_bleu: "Blue",
      alien_beige: "Beige",
      alien_rose: "Pink",
      alien_jaune: "Yellow",
    };

    for (const [key, value] of Object.entries(mapping)) {
      if (avatarPath.includes(key)) {
        return value;
      }
    }

    // Par défaut, retourner Green
    return "Green";
  };

  const profileAvatarPath = getProfileAvatarPath(selectedAvatar);
  const avatarColor = getAvatarColor(selectedAvatar);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 bg-[#1D1D1D] text-white py-3 font-[silkscreen] text-2xl sm:text-3xl lg:text-4xl items-center">
        <Link
          href="/"
          className="flex items-center justify-center cursor-pointer"
        >
          <Image width={200} height={0} className="h-auto" src="/header/logo.png" alt="logo" />
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

  if (!isAuthenticated) {
    // Header pour utilisateur non connecté
    return (
      <div className="grid grid-cols-2 bg-[#1D1D1D] text-white py-3 font-[silkscreen] text-2xl sm:text-3xl lg:text-4xl items-center">
        <Link
          href="/"
          className="flex items-center justify-center cursor-pointer"
        >
          <Image width={200} height={0} className="h-auto" src="/header/logo.png" alt="logo" />
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
    <div className="px-5 flex flex-row justify-between bg-[#1D1D1D] text-white py-3 font-[silkscreen] text-2xl sm:text-3xl lg:text-4xl items-center">
      <div>
        <Link
          href="/"
          className="flex items-center justify-center cursor-pointer"
        >
          <Image width={200} height={0} className="h-auto" src="/header/logo.png" alt="logo" />
        </Link>
      </div>
      <div className={"flex flex-row gap-5 items-center"}>
        {/* Cours (menu déroulant au survol / focus) */}
        <div
          className="relative flex items-center justify-center"
          onMouseEnter={() => openCoursesMenu()}
          onFocus={() => openCoursesMenu()}
          onMouseLeave={() => scheduleCloseCoursesMenu()}
          onBlur={() => scheduleCloseCoursesMenu()}
        >
          <Link
            href="#"
            className="flex items-center justify-center gap-2 cursor-pointer hover:text-[#13ADDC] transition"
          >
            <Image width={40} height={0} className="h-auto" src="/header/cours.png" alt="cours"/>
            <span className="text-base text-xl">Mes cours</span>
          </Link>

          {showCoursesMenu && (
            <div
              className="absolute top-full mt-2 right-1 bg-[#1D1D1D] border-2 border-white rounded-lg shadow-lg z-50 min-w-[160px]">
              <Link
                href="/carte/html"
                className="block px-4 py-2 text-base text-white hover:bg-[#13ADDC] transition"
                onClick={() => {
                  if (coursesCloseTimer.current) {
                    clearTimeout(coursesCloseTimer.current);
                    coursesCloseTimer.current = null;
                  }
                  setShowCoursesMenu(false);
                }}
              >
                HTML
              </Link>
              <Link
                href="/carte/css"
                className="block px-4 py-2 text-base text-white hover:bg-[#13ADDC] transition"
                onClick={() => {
                  if (coursesCloseTimer.current) {
                    clearTimeout(coursesCloseTimer.current);
                    coursesCloseTimer.current = null;
                  }
                  setShowCoursesMenu(false);
                }}
              >
                CSS
              </Link>
              <Link
                href="/carte/python"
                className="block px-4 py-2 text-base text-white hover:bg-[#13ADDC] transition rounded-b-lg"
                onClick={() => {
                  if (coursesCloseTimer.current) {
                    clearTimeout(coursesCloseTimer.current);
                    coursesCloseTimer.current = null;
                  }
                  setShowCoursesMenu(false);
                }}
              >
                Python
              </Link>
            </div>
          )}
        </div>

        {/* Missions (simple link désormais) */}
        <Link
          href="/missions"
          className="flex items-center justify-center gap-2 cursor-pointer hover:text-[#13ADDC] transition text-xl"
        >
          <Image
            width={30} height={0}
            className="h-auto"
            src="/header/missions.png"
            alt="missions"
          />
          <span>Missions</span>
        </Link>

        <Link
          href="/boutique"
          className="flex items-center justify-center gap-2 cursor-pointer hover:text-[#13ADDC] transition text-xl"
        >
          <Image
            width={30} height={0}
            className="h-auto"
            src="/header/boutique.png"
            alt="boutique"
          />
          <span>Boutique</span>
        </Link>
      </div>

      <div className="relative flex items-center justify-center gap-3" ref={menuRef}>
        <div className={"flex flex-col items-end"}>
          <div className={"flex flex-row items-center"}>
            <p className="text-lg">{userCoins}</p>
            <Image width={30} height={0} src="/header/coins.png" alt=""/>
          </div>
          <p className="text-lg">Niveau {userLevel}</p>
        </div>
        <button
          onClick={() => setShowAccountMenu(!showAccountMenu)}
          className="flex items-center justify-center gap-2 cursor-pointer hover:text-[#13ADDC] transition"
        >
          <Image
            src={profileAvatarPath}
            width={50}
            height={0}
            alt={"avatar"}
            className="z-20 object-cover pixelated-rendering rounded-full"
          />
        </button>

        {showAccountMenu && (
          <div className="absolute top-full mt-2 right-0 bg-[#1D1D1D] border-2 border-white rounded-lg shadow-lg z-50 min-w-[250px]">
            <Link
              href="/profil"
              className="block px-3 py-3 text-xl text-white hover:bg-[#13ADDC] hover:text-white transition rounded-t-lg"
              onClick={() => setShowAccountMenu(false)}
            >
              👤 Mon Compte
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-3 text-xl text-white hover:bg-red-600 hover:text-white transition rounded-b-lg"
            >
              🚪 Déconnexion
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
