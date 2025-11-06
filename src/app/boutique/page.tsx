"use client";
import Header from "../../../composants/header/page";
import { useState } from "react";

export default function Accueil() {
  const [active, setActive] = useState<"avatars" | "banners">("banners");

  return (
    <div className="bg-[#2D2D2D] h-screen font-[silkscreen]">
      <Header />
      <div className="w-full grid grid-cols-2 text-5xl mt-10">
        <button
          onClick={() => setActive("avatars")}
          className={`text-right border-r-2 pr-2 ${
            active === "avatars" ? "text-white border-white" : "text-gray-400 border-white"
          }`}
        >
          Avatars
        </button>
        <button
          onClick={() => setActive("banners")}
          className={`text-left border-l-2 pl-2 ${
            active === "banners" ? "text-white border-white" : "text-gray-400 border-white"
          }`}
        >
          Bannières
        </button>
      </div>

      {/* Avatars */}
      <div className={`${active === "avatars" ? "grid" : "hidden"} grid-cols-2 pt-16 gap-y-10`}>
        <div className="mx-auto w-fit">
          <img className="rounded-lg" src="profil/alien_vert.png" alt="" />
          <div className="grid grid-cols-2 text-white">
            <p>Alien vert</p>
            <div className="inline text-right">
              <p className="inline">500</p>
              <img className="inline" src="/header/coins.png" alt="" />
            </div>
          </div>
        </div>
        <div className="mx-auto w-fit">
          <img className="rounded-lg" src="profil/alien_beige.png" alt="" />
          <div className="grid grid-cols-2 text-white">
            <p>Alien beige</p>
            <div className="inline text-right">
              <p className="inline">500</p>
              <img className="inline" src="/header/coins.png" alt="" />
            </div>
          </div>
        </div>
        <div className="mx-auto w-fit">
          <img className="rounded-lg" src="profil/alien_jaune.png" alt="" />
          <div className="grid grid-cols-2 text-white">
            <p>Alien jaune</p>
            <div className="inline text-right">
              <p className="inline">500</p>
              <img className="inline" src="/header/coins.png" alt="" />
            </div>
          </div>
        </div>
        <div className="mx-auto w-fit">
          <img className="rounded-lg" src="profil/alien_bleu.png" alt="" />
          <div className="grid grid-cols-2 text-white">
            <p>Alien bleu</p>
            <div className="inline text-right">
              <p className="inline">500</p>
              <img className="inline" src="/header/coins.png" alt="" />
            </div>
          </div>
        </div>
        <div className="mx-auto w-fit">
          <img className="rounded-lg" src="profil/alien_rose.png" alt="" />
          <div className="grid grid-cols-2 text-white">
            <p>Alien rose</p>
            <div className="inline text-right">
              <p className="inline">500</p>
              <img className="inline" src="/header/coins.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      {/* Bannières */}
      <div className={`${active === "banners" ? "grid" : "hidden"} grid-cols-2 pt-16 gap-y-10`}>
        <div className="mx-auto w-fit">
          <img className="rounded-lg" src="profil/banniere1.png" alt="" />
          <div className="grid grid-cols-2 text-white">
            <p>Lune sanglante</p>
            <div className="inline text-right">
              <p className="inline">500</p>
              <img className="inline" src="/header/coins.png" alt="" />
            </div>
          </div>
        </div>
        <div className="mx-auto w-fit">
          <img className="rounded-lg" src="profil/banniere2.png" alt="" />
          <div className="grid grid-cols-2 text-white">
            <p>Ciel mauve</p>
            <div className="inline text-right">
              <p className="inline">500</p>
              <img className="inline" src="/header/coins.png" alt="" />
            </div>
          </div>
        </div>
        <div className="mx-auto w-fit">
          <img className="rounded-lg" src="profil/banniere3.png" alt="" />
          <div className="grid grid-cols-2 text-white">
            <p>Nuit étoilée</p>
            <div className="inline text-right">
              <p className="inline">500</p>
              <img className="inline" src="/header/coins.png" alt="" />
            </div>
          </div>
        </div>
        <div className="mx-auto w-fit">
          <img className="rounded-lg" src="profil/banniere4.png" alt="" />
          <div className="grid grid-cols-2 text-white">
            <p>Nuages pourpres</p>
            <div className="inline text-right">
              <p className="inline">500</p>
              <img className="inline" src="/header/coins.png" alt="" />
            </div>
          </div>
        </div>
        <div className="mx-auto w-fit">
          <img className="rounded-lg" src="/profil/banniere5.png" alt="" />
          <div className="grid grid-cols-2 text-white">
            <p>Espace abyssal</p>
            <div className="inline text-right">
              <p className="inline">500</p>
              <img className="inline" src="/header/coins.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
