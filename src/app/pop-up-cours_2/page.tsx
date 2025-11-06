/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from 'react';

const LevelUpPopup = () => {
  const [isOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: '#6b5b7a' }}
    >
      <div className="relative w-full max-w-4xl text-center">
        {/* Image de fond du pop-up */}
        <img
          src="/img/pop_up_fond.png"
          alt="Niveau Supérieur"
          className="w-full h-auto"
        />

        {/* Contenu centré */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-end text-black px-6 py-10 gap-5"
          style={{
            fontFamily: "'Silkscreen', cursive",
          }}
        >
          <div>
            <div className="flex items-center justify-center gap-3 mb-5">
              <img src="/img/etoile_emoji.png" alt="étoile" className="w-10 h-10" />
              <h1 className="text-4xl sm:text-5xl">Félicitations !</h1>
              <img src="/img/etoile_emoji.png" alt="étoile" className="w-10 h-10" />
            </div>

            <p className="text-2xl sm:text-3xl mb-2 gap-2">Vous avez terminé ce premier cours !</p>

            <p className="text-2xl sm:text-3xl mb-5 flex items-center justify-center gap-2">
              Vous avez reçu 250 XP !
              <img src="/img/boule_cristal_emoji.png" alt="XP" className="w-8 h-8" />
            </p>
            <p className="text-2xl sm:text-3xl mb-5 flex items-center justify-center ">
              ainsi qu’un nouveau badge sur votre profil.
            </p>
            <p className="text-2xl sm:text-3xl mb-2 flex items-center justify-center">
              <img src="/img/medaille_bronze_emoji.png" alt="valider" className="gap-5 w-10 h-10" />
            </p>
          </div>

        <button
          className="outline-[#989AAF] outline-2 border-2 border-[#FFFFFF] rounded bg-[#DADCE7] shadow-[0px_2px_0px_2px_#666880] hover:shadow-none hover:translate-y-2.5 px-10 py-3 w-60"
          aria-label="Fermer"
          type="button"
        >
          Fermer
        </button>

        </div>
      </div>

      {/* Import de la police Silkscreen */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&display=swap');
      `}</style>
    </div>
  );
};

export default LevelUpPopup;
