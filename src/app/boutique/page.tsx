"use client";
import Header from "../../../composants/header/page";
import { useState, useEffect } from "react";
import Image from "next/image";
import getCosmetics from "../requests/user/cosmetic/getCosmetics";
import getOwnedCosmetics from "../requests/user/cosmetic/getOwnedCosmetics";
import purchaseCosmetic from "../requests/user/cosmetic/purchaseCosmetic";
import { Cosmetic } from "../models/cosmetic.model";
import { Owned } from "../models/owned.model";
import { authClient } from "@/lib/auth-client";
import { IdCosmetic } from "../types/custom.types";

export default function Accueil() {
  const [active, setActive] = useState<"avatars" | "banners">("banners");
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<Cosmetic | null>(null);
  const [cosmetics, setCosmetics] = useState<Cosmetic[]>([]);
  const [ownedCosmetics, setOwnedCosmetics] = useState<Owned[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [userCoins, setUserCoins] = useState<number>(0);

  // Récupérer l'utilisateur connecté
  useEffect(() => {
    const fetchUser = async () => {
      const session = await authClient.getSession();
      if (session?.data?.user) {
        setUserId(session.data.user.id);
        // Récupérer les coins de l'utilisateur depuis l'API
        const userRes = await fetch(
          `/backend/api/user/${session.data.user.id}`
        );
        if (userRes.ok) {
          const userData = await userRes.json();
          setUserCoins(userData.coins || 0);
        }
      }
    };
    fetchUser();
  }, []);

  // Charger les cosmétiques et les items possédés
  useEffect(() => {
    const loadData = async () => {
      if (!userId) return;

      setLoading(true);
      try {
        const cosmeticsData = await getCosmetics();
        if (cosmeticsData) {
          setCosmetics(cosmeticsData);
        }

        const ownedData = await getOwnedCosmetics(userId);
        if (ownedData) {
          setOwnedCosmetics(ownedData);
        }
      } catch (err) {
        console.error("Erreur lors du chargement des données:", err);
        setError("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId]);

  // Vérifier si un cosmétique est possédé
  const isOwned = (idCosmetic: IdCosmetic) => {
    return ownedCosmetics.some((owned) => owned.idCosmetic === idCosmetic);
  };

  // Gérer l'achat
  const handlePurchase = async () => {
    if (!selected || !userId) return;

    setPurchasing(true);
    setError("");
    setMessage("");

    try {
      const result = await purchaseCosmetic(userId, selected.idCosmetic);

      if (result.success) {
        setMessage(result.message || "Achat réussi !");

        // Recharger les données
        const ownedData = await getOwnedCosmetics(userId);
        if (ownedData) {
          setOwnedCosmetics(ownedData);
        }

        // Mettre à jour les coins
        setUserCoins((prev) => prev - selected.price);

        setTimeout(() => {
          setModalOpen(false);
          setSelected(null);
          setMessage("");
        }, 2000);
      } else {
        setError(result.message || "Erreur lors de l'achat");
      }
    } catch (err) {
      console.error(err);
      setError("Erreur lors de l'achat");
    } finally {
      setPurchasing(false);
    }
  };

  // Filtrer les cosmétiques par type
  const avatars = cosmetics.filter((c) => c.type === "AVATAR");
  const banners = cosmetics.filter((c) => c.type === "BANNER");

  if (loading) {
    return (
      <div className="bg-[#2D2D2D] h-screen font-[silkscreen] flex items-center justify-center text-white">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#2D2D2D] h-screen font-[silkscreen]">
      <Header />

      {/* Afficher les messages */}
      {message && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded z-50">
          {message}
        </div>
      )}
      {error && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded z-50">
          {error}
        </div>
      )}

      {/* Afficher les coins de l'utilisateur */}
      <div className="text-white text-center mt-4 flex items-center justify-center gap-2">
        <span className="text-2xl">Vos coins:</span>
        <span className="text-2xl font-bold">{userCoins}</span>
        <Image src="/header/coins.png" alt="coins" width={30} height={30} />
      </div>

      <div className="w-full grid grid-cols-2 text-5xl mt-10">
        <button
          onClick={() => setActive("avatars")}
          className={`text-right border-r-2 pr-2 ${
            active === "avatars"
              ? "text-white border-white"
              : "text-gray-400 border-white"
          }`}
        >
          Avatars
        </button>
        <button
          onClick={() => setActive("banners")}
          className={`text-left border-l-2 pl-2 ${
            active === "banners"
              ? "text-white border-white"
              : "text-gray-400 border-white"
          }`}
        >
          Bannières
        </button>
      </div>

      {/* Avatars */}
      <div
        className={`${active === "avatars" ? "grid" : "hidden"} grid-cols-2 pt-16 gap-y-10`}
      >
        {avatars.map((cosmetic) => {
          const owned = isOwned(cosmetic.idCosmetic);
          return (
            <div
              key={cosmetic.idCosmetic}
              className="mx-auto w-fit"
              onClick={() => {
                if (!owned) {
                  setSelected(cosmetic);
                  setModalOpen(true);
                }
              }}
            >
              <div className="relative">
                <Image
                  className={`rounded-lg ${owned ? "opacity-50" : "cursor-pointer"}`}
                  src={`/${cosmetic.image}`}
                  alt={cosmetic.name}
                  width={200}
                  height={200}
                />
                {owned && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-green-500 text-2xl font-bold">
                      ✓ Possédé
                    </span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 text-white">
                <p>{cosmetic.name}</p>
                <div className="inline text-right">
                  <p className="inline">{cosmetic.price}</p>
                  <Image
                    className="inline ml-1"
                    src="/header/coins.png"
                    alt="coins"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bannières */}
      <div
        className={`${active === "banners" ? "grid" : "hidden"} grid-cols-2 pt-16 gap-y-10`}
      >
        {banners.map((cosmetic) => {
          const owned = isOwned(cosmetic.idCosmetic);
          return (
            <div
              key={cosmetic.idCosmetic}
              className="mx-auto w-fit"
              onClick={() => {
                if (!owned) {
                  setSelected(cosmetic);
                  setModalOpen(true);
                }
              }}
            >
              <div className="relative">
                <Image
                  className={`rounded-lg ${owned ? "opacity-50" : "cursor-pointer"}`}
                  src={`/${cosmetic.image}`}
                  alt={cosmetic.name}
                  width={200}
                  height={200}
                />
                {owned && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-green-500 text-2xl font-bold">
                      ✓ Possédé
                    </span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 text-white">
                <p>{cosmetic.name}</p>
                <div className="inline text-right">
                  <p className="inline">{cosmetic.price}</p>
                  <Image
                    className="inline ml-1"
                    src="/header/coins.png"
                    alt="coins"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pop-up de confirmation */}
      {modalOpen && selected && (
        <div>
          <div className="fixed inset-0 flex items-center justify-center z-50 text-black">
            <div
              className="absolute inset-0 bg-black opacity-60"
              onClick={() => {
                setModalOpen(false);
                setSelected(null);
                setError("");
              }}
            />
            <div className="relative bg-[#FAF2EA] rounded-lg p-4 w-80 mx-4 z-10">
              <h3 className="text-xl mb-4 mx-auto w-fit">⚠️ Confirmer ⚠️</h3>
              <p className="mb-2">
                Voulez-vous confirmer l&apos;achat de{" "}
                <span className="font-bold">{selected.name}</span> ?
              </p>
              <p className="mb-6 text-sm">
                Prix: <span className="font-bold">{selected.price}</span> coins
              </p>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <div className="grid grid-cols-2 w-full gap-2">
                <button
                  className="w-full text-center outline-[#989AAF] outline-2 border-2 border-[#FFFFFF] rounded bg-[#DADCE7] shadow-[0px_2px_0px_2px_#666880] hover:shadow-none hover:mt-0.5"
                  onClick={() => {
                    setModalOpen(false);
                    setSelected(null);
                    setError("");
                  }}
                  disabled={purchasing}
                >
                  Annuler
                </button>
                <button
                  className="outline-[#989AAF] outline-2 border-2 border-[#FFFFFF] rounded bg-[#DADCE7] shadow-[0px_2px_0px_2px_#666880] hover:shadow-none hover:mt-0.5 px-5 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handlePurchase}
                  disabled={purchasing}
                >
                  {purchasing ? "..." : "Confirmer"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
