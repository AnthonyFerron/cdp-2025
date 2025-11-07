"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import getOwnedCosmetics from "@/app/requests/user/cosmetic/getOwnedCosmetics";
import equipCosmetic from "@/app/requests/user/cosmetic/equipCosmetic";
import getUser from "@/app/requests/user/getUser";
import updateUser from "@/app/requests/user/updateUser";
import deleteUser from "@/app/requests/user/deleteUser";
import getCountries from "@/app/requests/user/country/getCountries";
import recalculateUserLevel from "@/app/requests/user/recalculateUserLevel";
import { Owned } from "@/app/models/owned.model";
import Header from "../../../composants/header/page";

type UserData = {
  id: string;
  name: string;
  email: string;
  experience: number;
  levels: number;
  coins: number;
  id_country: number;
};

type Country = {
  id_country: number;
  name: string;
  image: string;
};

export default function Profil() {
  const router = useRouter();
  const params = useSearchParams();
  const paramValue = params.get("edit");

  const hasAnyParam = params.toString() !== "";

  const [userId, setUserId] = useState<string | null>(null);
  const [ownedCosmetics, setOwnedCosmetics] = useState<Owned[]>([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    id_country: 0,
  });
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [levelInfo, setLevelInfo] = useState<{
    xpForNextLevel: number;
    xpProgress: number;
    xpNeededForNextLevel: number;
    progressPercentage: number;
  } | null>(null);

  const level = userData?.levels || 1;
  const currentXP = userData?.experience || 0;
  // XP dans le niveau actuel (pas le total)
  const currentLevelXP = levelInfo?.xpProgress || 0;
  // XP requis pour passer au niveau suivant
  const xpRequiredForNextLevel = 1000 + 500 * (level - 1);
  // Utiliser le pourcentage calculé par le backend
  const progressPercent = levelInfo?.progressPercentage || 0;

  useEffect(() => {
    const fetchUser = async () => {
      const session = await authClient.getSession();
      if (session?.data?.user) {
        setUserId(session.data.user.id);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const loadUserData = async () => {
      if (!userId) return;

      try {
        // Recalculer le niveau de l'utilisateur et récupérer les infos de progression
        const levelData = await recalculateUserLevel(userId);
        setLevelInfo({
          xpForNextLevel: levelData.xpForNextLevel,
          xpProgress: levelData.xpProgress,
          xpNeededForNextLevel: levelData.xpNeededForNextLevel,
          progressPercentage: levelData.progressPercentage,
        });

        // Charger les données utilisateur mises à jour
        const user = await getUser(userId);
        setUserData(user);
        setFormData({
          name: user.name || "",
          email: user.email || "",
          id_country: user.id_country || 0,
        });
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };

    loadUserData();
  }, [userId]);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const countriesData = await getCountries();
        setCountries(countriesData);
      } catch (error) {
        console.error("Failed to load countries:", error);
      }
    };

    loadCountries();
  }, []);

  useEffect(() => {
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

    loadOwnedCosmetics();
  }, [userId]);

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

  const ownedBanners = ownedCosmetics
    .filter((item) => item.Cosmetic?.type === "BANNER")
    .map((item) => ({
      id: item.idCosmetic,
      image: getImagePath(item.Cosmetic?.image || ""),
      isEquiped: item.isEquiped,
      name: item.Cosmetic?.name || "",
    }));

  const ownedAvatars = ownedCosmetics
    .filter((item) => item.Cosmetic?.type === "AVATAR")
    .map((item) => ({
      id: item.idCosmetic,
      image: getImagePath(item.Cosmetic?.image || ""),
      isEquiped: item.isEquiped,
      name: item.Cosmetic?.name || "",
    }));

  const equippedBanner =
    ownedBanners.find((b) => b.isEquiped)?.image ||
    ownedBanners[0]?.image ||
    "/cosmetics/banners/banniere1.png";
  const equippedAvatar =
    ownedAvatars.find((a) => a.isEquiped)?.image ||
    ownedAvatars[0]?.image ||
    "/cosmetics/avatars/alien_vert.png";

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "id_country" ? parseInt(value) : value,
    }));
  };

  const handleSaveProfile = async () => {
    if (!userId) return;

    try {
      await updateUser(userId, formData);
      const updatedUser = await getUser(userId);
      setUserData(updatedUser);
      setNotification({
        message: "Profil mis à jour avec succès !",
        type: "success",
      });
    } catch (error) {
      console.error("Failed to update user:", error);
      setNotification({
        message: "Erreur lors de la mise à jour du profil",
        type: "error",
      });
    }
  };

  const handleDeleteAccount = async () => {
    if (!userId) return;

    try {
      await deleteUser(userId);
      await authClient.signOut();
      setNotification({
        message: "Compte supprimé avec succès",
        type: "success",
      });
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Failed to delete user:", error);
      setNotification({
        message: "Erreur lors de la suppression du compte",
        type: "error",
      });
    } finally {
      setShowDeleteModal(false);
    }
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const visibleCount = 3;
  const [startIndexBanners, setStartIndexBanners] = useState(0);
  const [startIndexAvatars, setStartIndexAvatars] = useState(0);

  const [selectedBanner, setSelectedBanner] = useState(equippedBanner);
  const [selectedAvatar, setSelectedAvatar] = useState(equippedAvatar);

  // Fonction pour convertir le chemin de l'avatar en chemin de l'avatar de profil
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

  // Fonction pour obtenir la couleur de l'avatar équipé
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

  useEffect(() => {
    setSelectedBanner(equippedBanner);
    setSelectedAvatar(equippedAvatar);
  }, [equippedBanner, equippedAvatar]);

  const nextBanners = () => {
    if (ownedBanners.length === 0) return;
    setStartIndexBanners((prev) => (prev + 1) % ownedBanners.length);
  };

  const prevBanners = () => {
    if (ownedBanners.length === 0) return;
    setStartIndexBanners(
      (prev) => (prev - 1 + ownedBanners.length) % ownedBanners.length
    );
  };

  const nextAvatars = () => {
    if (ownedAvatars.length === 0) return;
    setStartIndexAvatars((prev) => (prev + 1) % ownedAvatars.length);
  };

  const prevAvatars = () => {
    if (ownedAvatars.length === 0) return;
    setStartIndexAvatars(
      (prev) => (prev - 1 + ownedAvatars.length) % ownedAvatars.length
    );
  };

  const visibleBanners = [];
  const visibleAvatars = [];

  for (let i = 0; i < visibleCount && i < ownedBanners.length; i++) {
    visibleBanners.push(
      ownedBanners[(startIndexBanners + i) % ownedBanners.length]
    );
  }

  for (let i = 0; i < visibleCount && i < ownedAvatars.length; i++) {
    visibleAvatars.push(
      ownedAvatars[(startIndexAvatars + i) % ownedAvatars.length]
    );
  }

  const centerBanner = visibleBanners[1];
  const centerAvatar = visibleAvatars[1];

  const handleEquipCosmetic = async () => {
    if (!userId || !centerBanner || !centerAvatar) return;

    try {
      await equipCosmetic(userId, centerBanner.id);
      await equipCosmetic(userId, centerAvatar.id);

      setSelectedBanner(centerBanner.image);
      setSelectedAvatar(centerAvatar.image);

      const owned = await getOwnedCosmetics(userId);
      if (owned) {
        setOwnedCosmetics(owned);
      }
    } catch {}
  };

  if (loading) {
    return (
      <div className="font-[silkscreen] flex items-center justify-center bg-[#2D2D2D] w-screen min-h-screen text-white">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="font-[silkscreen] flex flex-col bg-[#2D2D2D] w-screen min-h-screen">
      <Header />
      <div className="w-full">
        <Image
          src={selectedBanner}
          alt=""
          width={600}
          height={0}
          className="object-cover w-full h-[250px] pixelated-rendering transition-transform duration-500 ease-in-out"
          style={{ transformOrigin: "center center" }}
        />
        <div className="flex mx-40 gap-5 -translate-y-1/2">
          <div>
            <Image
              src={profileAvatarPath}
              width={150}
              height={150}
              alt={"avatar"}
              className="z-20 object-cover pixelated-rendering rounded-full"
            />
          </div>
          <div className="flex flex-col justify-between gap-5 w-full ">
            <div className="flex items-center gap-5 mb-3 w-full">
              <div className="flex items-center gap-2 translate-y-2 text-2xl">
                <span>🥇</span>
                <span>🥇</span>
                <span>🥇</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between text-white text-sm mb-1">
                  <p>Niveau {level}</p>
                  <p>
                    {currentLevelXP} / {xpRequiredForNextLevel} XP
                  </p>
                </div>
                <div className="h-3 w-full bg-gray-700 rounded-full border border-white">
                  <div
                    className="h-full bg-green-500 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between relative w-full mx-auto h-16">
              <div className={"flex gap-2"}>
                <h2 className="text-4xl font-bold text-white">Solid Snake</h2>
                <h2 className={"text-4xl"}>🇫🇷</h2>
              </div>
              <button
                onClick={() => {
                  const p = new URLSearchParams(params.toString());
                  if (hasAnyParam) {
                    p.forEach((_, key) => p.delete(key));
                  } else {
                    p.set("edit", "inventory");
                  }
                  router.push(`${window.location.pathname}?${p.toString()}`);
                }}
                className="outline-[#989AAF] outline-2 border-2 border-white rounded bg-[#DADCE7] shadow-[0px_2px_0px_2px_#666880] hover:shadow-none hover:translate-y-0.5 px-5 hover:cursor-pointer transition-transform duration-300"
                type="button"
              >
                {hasAnyParam ? (
                  "annuler"
                ) : (
                  <>
                    modifier
                    <br />
                    le profil
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {(() => {
        switch (paramValue) {
          case "inventory":
            return (
              <div className={"flex flex-col text-white -translate-y-5 gap-5"}>
                <div
                  className={
                    "flex gap-2 text-xl justify-center w-full  font-bold"
                  }
                >
                  <p>inventaire</p>
                  <p>|</p>
                  <a
                    onClick={() => {
                      const p = new URLSearchParams(params.toString());
                      p.set("edit", "informations");
                      router.push(
                        `${window.location.pathname}?${p.toString()}`
                      );
                    }}
                    className={"hover:cursor-pointer opacity-50"}
                  >
                    informations
                  </a>
                </div>
                <h2 className={"text-2xl underline ml-5 font-bold"}>
                  Bannières
                </h2>
                <div className="relative w-full mx-auto h-[150px] mb-4 overflow-hidden">
                  <div className="flex gap-4 h-full">
                    {visibleBanners.map((banner, idx) => (
                      <div
                        key={banner.id}
                        className="relative cursor-pointer rounded-3xl transition-transform duration-500 ease-in-out"
                        style={{
                          width: "33.33%",
                          height: "100%",
                          transform: idx === 1 ? "scale(1)" : "scale(0.75)",
                          zIndex: idx === 1 ? 10 : 1,
                        }}
                      >
                        <Image
                          src={banner.image}
                          alt={banner.name}
                          fill
                          className="object-cover rounded-2xl pixelated-rendering"
                          sizes="33vw"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={prevBanners}
                    className="absolute top-1/2 h-full w-1/3 left-0 -translate-y-1/2 px-24 py-2 transition z-20 bg-gradient-to-l from-transparent to-[#2D2D2D]"
                  >
                    <Image
                      src="/profil/arrow_basic_w.png"
                      alt="Previous"
                      width={40}
                      height={40}
                      className="pixelated-rendering"
                    />
                  </button>
                  <button
                    onClick={nextBanners}
                    className="absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-full flex items-center justify-end px-24 bg-gradient-to-r from-transparent to-[#2D2D2D] transition z-20"
                  >
                    <Image
                      src="/profil/arrow_basic_e.png"
                      alt="Next"
                      width={40}
                      height={40}
                      className="pixelated-rendering"
                    />
                  </button>
                </div>
                <h2 className={"text-2xl underline ml-5 font-bold"}>Avatars</h2>
                <div className="relative w-full mx-auto h-[150px] mb-4 overflow-hidden">
                  <div className="flex gap-4 h-full">
                    {visibleAvatars.map((avatar, idx) => (
                      <div
                        key={avatar.id}
                        className="relative cursor-pointer rounded-3xl transition-transform duration-500 ease-in-out"
                        style={{
                          width: "33.33%",
                          height: "100%",
                          transform: idx === 1 ? "scale(1)" : "scale(0.75)",
                          zIndex: idx === 1 ? 10 : 1,
                        }}
                      >
                        <Image
                          src={avatar.image}
                          alt={avatar.name}
                          fill
                          className="object-cover rounded-2xl pixelated-rendering"
                          sizes="33vw"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={prevAvatars}
                    className="absolute top-1/2 h-full w-1/3 left-0 -translate-y-1/2 px-24 py-2 transition z-20 bg-gradient-to-l from-transparent to-[#2D2D2D]"
                  >
                    <Image
                      src="/profil/arrow_basic_w.png"
                      alt="Previous"
                      width={40}
                      height={40}
                      className="pixelated-rendering"
                    />
                  </button>
                  <button
                    onClick={nextAvatars}
                    className="absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-full flex items-center justify-end px-24 bg-gradient-to-r from-transparent to-[#2D2D2D] transition z-20"
                  >
                    <Image
                      src="/profil/arrow_basic_e.png"
                      alt="Next"
                      width={40}
                      height={40}
                      className="pixelated-rendering"
                    />
                  </button>
                </div>
                <div className="flex justify-center gap-4 mb-8">
                  <button
                    onClick={handleEquipCosmetic}
                    className="outline-[#989AAF] outline-2 border-2 border-[#FFFFFF] rounded bg-[#DADCE7] shadow-[0px_2px_0px_2px_#666880] hover:shadow-none hover:translate-y-0.5 px-5 text-black"
                    type="button"
                  >
                    Appliquer
                  </button>
                </div>
              </div>
            );
          case "informations":
            return (
              <div className={"text-white -translate-y-5"}>
                <div
                  className={
                    "flex gap-2 text-xl justify-center w-full font-bold"
                  }
                >
                  <a
                    onClick={() => {
                      const p = new URLSearchParams(params.toString());
                      p.set("edit", "inventory");
                      router.push(
                        `${window.location.pathname}?${p.toString()}`
                      );
                    }}
                    className={"hover:cursor-pointer opacity-50"}
                  >
                    inventaire
                  </a>
                  <p>|</p>
                  <p>informations</p>
                </div>
                <div
                  className={
                    "flex flex-col justify-evenly my-5 gap-5 items-center"
                  }
                >
                  <div className={"flex flex-row justify-evenly gap-28"}>
                    <div className={"flex flex-col w-72"}>
                      <label htmlFor="name">nom d&#39;utilisateur</label>
                      <input
                        type="text"
                        name="name"
                        className={
                          "bg-[#505157] py-1.5 border-2 rounded border-[#2D2D2D] outline-2 outline-[#505157] pl-5"
                        }
                        value={formData.name}
                        onChange={handleInputChange}
                        id={"name"}
                      />
                    </div>
                    <div className={"flex flex-col w-72"}>
                      <label htmlFor="email"> email</label>
                      <input
                        type="email"
                        name="email"
                        className={
                          "bg-[#505157] py-1.5 border-2 rounded border-[#2D2D2D] outline-2 outline-[#505157] pl-5"
                        }
                        value={formData.email}
                        onChange={handleInputChange}
                        id={"email"}
                      />
                    </div>
                  </div>
                  <div className={"flex flex-row justify-evenly gap-28"}>
                    <div className={"flex flex-col w-72"}>
                      <label htmlFor="password">mot de passe</label>
                      <input
                        type="password"
                        className={
                          "bg-[#505157] py-1.5 border-2 rounded border-[#2D2D2D] outline-2 outline-[#505157] pl-5"
                        }
                        value={"********"}
                        id={"password"}
                        disabled
                      />
                    </div>
                    <div className={"flex flex-col w-72"}>
                      <label htmlFor="country">pays</label>
                      <select
                        name="id_country"
                        value={formData.id_country}
                        onChange={handleInputChange}
                        className="p-2 rounded bg-[#505157] text-white font-silkscreen border-2 border-[#2D2D2D] outline-2 outline-[#505157]"
                        id={"country"}
                      >
                        <option value={0} disabled>
                          Choisissez un pays
                        </option>
                        {countries.map((country) => (
                          <option
                            key={country.id_country}
                            value={country.id_country}
                          >
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button
                    className="outline-[#989AAF] outline-2 border-2 border-[#FFFFFF] rounded bg-[#DADCE7] shadow-[0px_2px_0px_2px_#666880] hover:shadow-none hover:translate-y-0.5 px-5 text-black w-fit"
                    type="button"
                    onClick={handleSaveProfile}
                  >
                    Appliquer
                  </button>
                </div>
                <div className={"flex flex-col ml-80"}>
                  <div>
                    <h2 className={"text-red-400 font-bold"}>zone danger</h2>
                  </div>
                  <div className={"text-white flex gap-10"}>
                    <button
                      className="outline-[#cd0b2a] outline-2 border-2 border-[#ff627b] rounded bg-[#ee2747] shadow-[0px_2px_0px_2px_#cd0b2a] hover:shadow-none hover:translate-y-0.5 px-5 w-fit"
                      type="button"
                      onClick={() => setShowDeleteModal(true)}
                    >
                      <>
                        supprimer le
                        <br />
                        compte
                      </>
                    </button>
                  </div>
                </div>
              </div>
            );
          default:
            return (
              <div>
                <div className={"flex mx-40 flex-col gap-5 -translate-y-5"}>
                  <h2 className={"text-white font-bold text-2xl underline"}>
                    Progression
                  </h2>
                  <div className={"flex justify-between"}>
                    <div className={"flex gap-5"}>
                      <div className="flex items-center justify-center w-[100px]">
                        <Image
                          src="/profil/language/python_pixel.png"
                          alt="Python"
                          width={80}
                          height={80}
                          className="pixelated-rendering"
                        />
                      </div>
                      <div className={"text-white"}>
                        <h2 className={"text-3xl font-bold"}>python</h2>
                        <p>
                          complété à <span className={"font-bold"}>50</span>%
                        </p>
                        <p>
                          <span className={"font-bold"}>3</span> niveau réussis
                        </p>
                      </div>
                    </div>
                    <div className={"flex gap-5"}>
                      <div className="flex items-center justify-center w-[100px]">
                        <Image
                          src="/profil/language/html5_pixel.png"
                          alt="HTML"
                          width={80}
                          height={80}
                          className="pixelated-rendering"
                        />
                      </div>
                      <div className={"text-white"}>
                        <h2 className={"text-3xl font-bold"}>html</h2>
                        <p>
                          complété à <span className={"font-bold"}>50</span>%
                        </p>
                        <p>
                          <span className={"font-bold"}>3</span> niveau réussis
                        </p>
                      </div>
                    </div>
                    <div className={"flex gap-5"}>
                      <div className="flex items-center justify-center w-[100px]">
                        <Image
                          src="/profil/language/css_old_pixel.png"
                          alt="CSS"
                          width={80}
                          height={80}
                          className="pixelated-rendering"
                        />
                      </div>
                      <div className={"text-white"}>
                        <h2 className={"text-3xl font-bold"}>css</h2>
                        <p>
                          complété à <span className={"font-bold"}>50</span>%
                        </p>
                        <p>
                          <span className={"font-bold"}>3</span> niveau réussis
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
        }
      })()}

      {/* Ground Section with Avatars - masqué en mode édition */}
      {!hasAnyParam && (
        <div className="relative w-full mt-auto">
          {/* Conteneur des avatars - positionnés au-dessus du ground */}
          <div className="absolute bottom-full left-0 right-0 flex items-end justify-between px-32 pb-1">
            {/* Avatar de gauche */}
            <div className="flex-1 flex justify-start items-end">
              <Image
                src={`/profil/avatars/alien${avatarColor}1.png`}
                alt="avatar left"
                width={120}
                height={120}
                className="pixelated-rendering"
              />
            </div>

            {/* Avatar du milieu */}
            <div className="flex-1 flex justify-center items-end">
              <Image
                src={`/profil/avatars/alien${avatarColor}2.png`}
                alt="avatar center"
                width={120}
                height={120}
                className="pixelated-rendering"
              />
            </div>

            {/* Avatar de droite */}
            <div className="flex-1 flex justify-end items-end">
              <Image
                src={`/profil/avatars/alien${avatarColor}3.png`}
                alt="avatar right"
                width={120}
                height={120}
                className="pixelated-rendering"
              />
            </div>
          </div>

          {/* Image de fond ground.png */}
          <Image
            src="/profil/ground.png"
            alt="ground"
            width={1440}
            height={94}
            className="w-full h-auto pixelated-rendering"
          />
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-[#2D2D2D] border-4 border-red-600 rounded-lg p-8 max-w-md">
            <h2 className="text-white font-silkscreen text-2xl mb-4">
              Confirmer la suppression
            </h2>
            <p className="text-white mb-6">
              Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est
              irréversible et toutes vos données seront perdues.
            </p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="outline-[#989AAF] outline-2 border-2 border-[#FFFFFF] rounded bg-[#DADCE7] shadow-[0px_2px_0px_2px_#666880] hover:shadow-none hover:translate-y-0.5 px-5 py-2 text-black font-silkscreen"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteAccount}
                className="outline-[#cd0b2a] outline-2 border-2 border-[#ff627b] rounded bg-[#ee2747] shadow-[0px_2px_0px_2px_#cd0b2a] hover:shadow-none hover:translate-y-0.5 px-5 py-2 text-white font-silkscreen"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {notification && (
        <div
          className={`fixed top-5 right-5 z-50 px-6 py-4 rounded-lg shadow-lg border-2 animate-slide-in ${
            notification.type === "success"
              ? "bg-green-600 border-green-400 text-white"
              : "bg-red-600 border-red-400 text-white"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">
              {notification.type === "success" ? "✓" : "✕"}
            </span>
            <p className="font-silkscreen text-sm">{notification.message}</p>
            <button
              onClick={() => setNotification(null)}
              className="ml-4 hover:opacity-70 text-xl font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
