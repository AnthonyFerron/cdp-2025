"use client";
import Header from "../../../composants/header/page";
import { FooterMini } from "../../../composants/footer/page";
import { useState } from "react";

export default function Accueil() {
  const [active, setActive] = useState<"avatars" | "banners">("banners");
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="bg-[#2D2D2D] h-screen font-[silkscreen]">
      <Header />
      <div className="w-full grid grid-cols-2 text-5xl mt-10">
        <button
          onClick={() => setActive("avatars")}
          className={`text-right border-r-2 pr-2 ${active === "avatars" ? "text-white border-white" : "text-gray-400 border-white"
            }`}
        >
          Avatars
        </button>
        <button
          onClick={() => setActive("banners")}
          className={`text-left border-l-2 pl-2 ${active === "banners" ? "text-white border-white" : "text-gray-400 border-white"
            }`}
        >
          Bannières
        </button>
      </div>

      {/* Avatars */}
      <div className={`${active === "avatars" ? "grid" : "hidden"} grid-cols-2 pt-16 gap-y-10`}>
        <div className="mx-auto w-fit" onClick={() => { setSelected("Alien vert"); setModalOpen(true); }}>
          <img className="rounded-lg" src="profil/alien_vert.png" alt="" />
          <div className="grid grid-cols-2 text-white">
            <p>Alien vert</p>
            <div className="inline text-right">
              <p className="inline">500</p>
              <img className="inline" src="/header/coins.png" alt="" />
            </div>
          </div>
        </div>
        <div className="mx-auto w-fit" onClick={() => { setSelected("Alien beige"); setModalOpen(true); }}>
          <img className="rounded-lg" src="profil/alien_beige.png" alt="" />
          <div className="grid grid-cols-2 text-white">
            <p>Alien beige</p>
            <div className="inline text-right">
              <p className="inline">500</p>
              <img className="inline" src="/header/coins.png" alt="" />
            </div>
          </div>
        </div>
        <div className="mx-auto w-fit" onClick={() => { setSelected("Alien jaune"); setModalOpen(true); }}>
          <img className="rounded-lg" src="profil/alien_jaune.png" alt="" />
          <div className="grid grid-cols-2 text-white">
            <p>Alien jaune</p>
            <div className="inline text-right">
              <p className="inline">500</p>
              <img className="inline" src="/header/coins.png" alt="" />
            </div>
          </div>
        </div>
        <div className="mx-auto w-fit" onClick={() => { setSelected("Alien bleu"); setModalOpen(true); }}>
          <img className="rounded-lg" src="profil/alien_bleu.png" alt="" />
          <div className="grid grid-cols-2 text-white">
            <p>Alien bleu</p>
            <div className="inline text-right">
              <p className="inline">500</p>
              <img className="inline" src="/header/coins.png" alt="" />
            </div>
          </div>
        </div>
        <div className="mx-auto w-fit" onClick={() => { setSelected("Alien rose"); setModalOpen(true); }}>
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
        <div className="mx-auto w-fit" onClick={() => { setSelected("Lune sanglante"); setModalOpen(true); }}>
          <img className="rounded-lg" src="profil/banniere1.png" alt="" />
          <div className="grid grid-cols-2 text-white">
            <p>Lune sanglante</p>
            <div className="inline text-right">
              <p className="inline">500</p>
              <img className="inline" src="/header/coins.png" alt="" />
            </div>
          </div>
        </div>
        <div className="mx-auto w-fit" onClick={() => { setSelected("Ciel mauve"); setModalOpen(true); }}>
          <img className="rounded-lg" src="profil/banniere2.png" alt="" />
          <div className="grid grid-cols-2 text-white">
            <p>Ciel mauve</p>
            <div className="inline text-right">
              <p className="inline">500</p>
              <img className="inline" src="/header/coins.png" alt="" />
            </div>
          </div>
        </div>
        <div className="mx-auto w-fit" onClick={() => { setSelected("Nuit étoilée"); setModalOpen(true); }}>
          <img className="rounded-lg" src="profil/banniere3.png" alt="" />
          <div className="grid grid-cols-2 text-white">
            <p>Nuit étoilée</p>
            <div className="inline text-right">
              <p className="inline">500</p>
              <img className="inline" src="/header/coins.png" alt="" />
            </div>
          </div>
        </div>
        <div className="mx-auto w-fit" onClick={() => { setSelected("Nuages pourpres"); setModalOpen(true); }}>
          <img className="rounded-lg" src="profil/banniere4.png" alt="" />
          <div className="grid grid-cols-2 text-white">
            <p>Nuages pourpres</p>
            <div className="inline text-right">
              <p className="inline">500</p>
              <img className="inline" src="/header/coins.png" alt="" />
            </div>
          </div>
        </div>
        <div className="mx-auto w-fit" onClick={() => { setSelected("Espace abyssal"); setModalOpen(true); }}>
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

      <div className="h-[1px] mb-20">

      </div>

      {/* Pop-up de confirmation */}
      {modalOpen && (
        <div>
          <div className="fixed inset-0 flex items-center justify-center z-50 text-black">
            <div className="absolute inset-0 bg-black opacity-60" onClick={() => { setModalOpen(false); setSelected(null); }} />
            <div className="relative bg-[#FAF2EA] rounded-lg p-4 w-80 mx-4 z-10">
              <h3 className="text-xl mb-4 mx-auto w-fit">⚠️ Confirmer ⚠️</h3>
              <p className="mb-6">Voulez-vous confirmer l'achat de <span className="font-bold">{selected}</span> ?</p>
              <div className="grid grid-cols-2 w-full">
                <button
                  className="w-[80%] text-center outline-[#989AAF] outline-2 border-2 border-[#FFFFFF] rounded bg-[#DADCE7] shadow-[0px_2px_0px_2px_#666880] hover:shadow-none hover:mt-0.5"
                  onClick={() => { setModalOpen(false); setSelected(null); }}
                >
                  Annuler
                </button>
                <button
                  className="outline-[#989AAF] outline-2 border-2 border-[#FFFFFF] rounded bg-[#DADCE7] shadow-[0px_2px_0px_2px_#666880] hover:shadow-none hover:mt-0.5 px-5"
                  onClick={() => { setModalOpen(false); setSelected(null); }}
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <FooterMini />
    </div>
  );
}
