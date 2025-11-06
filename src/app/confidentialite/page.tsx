// app/politique-de-confidentialite/page.tsx
"use client";

import React from "react";
import { Silkscreen, Handjet } from "next/font/google";

// Import des polices Google
const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const handjet = Handjet({
  subsets: ["latin"],
  weight: ["400"],
});

export default function PolitiqueConfidentialite() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white px-8 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Titre principal */}
        <h1
          className={`${silkscreen.className} text-center text-4xl text-cyan-400 mb-12 tracking-widest drop-shadow-[0_0_6px_#393A3C]`}
        >
          POLITIQUE DE CONFIDENTIALITÉ
        </h1>

        {/* INTRODUCTION */}
        <section className="mb-10">
          <h2
            className={`${silkscreen.className} text-2xl text-cyan-300 mb-3 drop-shadow-[0_0_6px_#393A3C]`}
          >
            • INTRODUCTION
          </h2>
          <div className="bg-[#251F1F] p-6 rounded-xl shadow-[0_0_12px_#393A3C]">
            <p className={`${handjet.className} leading-relaxed`}>
              Bienvenue sur <strong>GamiCode</strong>.<br />
              Nous accordons une grande importance à la protection de vos
              données personnelles. Cette politique explique comment vos
              informations sont collectées, utilisées et protégées lorsque vous
              utilisez notre site de réservation de concerts.
            </p>
          </div>
        </section>

        {/* DONNÉES COLLECTÉES */}
        <section className="mb-10">
          <h2
            className={`${silkscreen.className} text-2xl text-cyan-300 mb-3 drop-shadow-[0_0_6px_#393A3C]`}
          >
            • DONNÉES COLLECTÉES
          </h2>
          <div className="bg-[#251F1F] p-6 rounded-xl shadow-[0_0_12px_#393A3C]">
            <p className={handjet.className}>
              Nous pouvons collecter les informations suivantes :
            </p>
            <ol
              className={`${handjet.className} list-decimal ml-6 mt-2 space-y-2`}
            >
              <li>
                Vos informations personnelles : nom, prénom, adresse e-mail,
                téléphone.
              </li>
              <li>
                Vos données techniques : adresse IP, type d’appareil,
                navigateur.
              </li>
            </ol>
          </div>
        </section>

        {/* PARTAGE DES DONNÉES */}
        <section className="mb-10">
          <h2
            className={`${silkscreen.className} text-2xl text-cyan-300 mb-3 drop-shadow-[0_0_6px_#393A3C]`}
          >
            • PARTAGE DES DONNÉES
          </h2>
          <div className="bg-[#251F1F] p-6 rounded-xl shadow-[0_0_12px_#393A3C]">
            <p className={handjet.className}>
              Nous ne partageons pas vos données avec des tiers, sauf :
            </p>
            <ul
              className={`${handjet.className} list-disc ml-6 mt-2 space-y-2`}
            >
              <li>
                Les prestataires techniques indispensables (paiement,
                hébergement, e-mail).
              </li>
              <li>
                Les autorités compétentes, uniquement si la loi l’exige.
              </li>
            </ul>
          </div>
        </section>

        {/* CONSERVATION ET SÉCURITÉ */}
        <section className="mb-10">
          <h2
            className={`${silkscreen.className} text-2xl text-cyan-300 mb-3 drop-shadow-[0_0_6px_#393A3C]`}
          >
            • CONSERVATION ET SÉCURITÉ
          </h2>
          <div className="bg-[#251F1F] p-6 rounded-xl shadow-[0_0_12px_#393A3C]">
            <p className={handjet.className}>
              Vos données sont conservées pendant la durée nécessaire à la
              gestion de vos réservations. Nous mettons en place des mesures de
              sécurité techniques et organisationnelles pour les protéger.
            </p>
          </div>
        </section>

        {/* VOS DROITS */}
        <section className="mb-10">
          <h2
            className={`${silkscreen.className} text-2xl text-cyan-300 mb-3 drop-shadow-[0_0_6px_#393A3C]`}
          >
            • VOS DROITS
          </h2>
          <div className="bg-[#251F1F] p-6 rounded-xl shadow-[0_0_12px_#393A3C]">
            <p className={handjet.className}>
              Vous disposez d’un droit d’accès, de rectification, de suppression
              et d’opposition à vos données. Pour exercer ces droits,
              contactez-nous à :{" "}
              <span className="text-cyan-400">
                [adresse e-mail de contact]
              </span>.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
