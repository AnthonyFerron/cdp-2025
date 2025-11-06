// app/cgu/page.tsx
"use client";

import React from "react";
import { Silkscreen, Handjet } from "next/font/google";

const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const handjet = Handjet({
  subsets: ["latin"],
  weight: ["400"],
});

export default function CGU() {
  return (
<main className="min-h-screen bg-[#0a0a0f] text-white px-12 py-16 font-handjet [&_p]:text-[20px] [&_li]:text-[20px] [&_span:not(h1,h2,h3)]:text-[20px]">
      <div className="max-w-4xl mx-auto">
        {/* Titre principal */}
        <h1
          className={`${silkscreen.className} text-center text-4xl text-cyan-400 mb-12 tracking-widest drop-shadow-[0_0_6px_#393A3C]`}
        >
          CONDITIONS GÉNÉRALES D’UTILISATION
        </h1>

        {/* Objet du site */}
        <section className="mb-10">
          <h2
            className={`${silkscreen.className} text-2xl text-cyan-300 mb-3 drop-shadow-[0_0_6px_#393A3C]`}
          >
            • OBJET DU SITE
          </h2>
          <div className="bg-[#251F1F] p-6 rounded-xl shadow-[0_0_12px_#393A3C]">
            <p className={`${handjet.className} leading-relaxed`}>
              <strong>GamiCode</strong> est une plateforme d’apprentissage du
              code (HTML, CSS, Python) avec cours, exercices et mini-jeux
              éducatifs.<br />
              L’objectif est d’apprendre la programmation de façon ludique et
              progressive.
            </p>
          </div>
        </section>

        {/* Accès et Utilisation */}
        <section className="mb-10">
          <h2
            className={`${silkscreen.className} text-2xl text-cyan-300 mb-3 drop-shadow-[0_0_6px_#393A3C]`}
          >
            • ACCÈS ET UTILISATION
          </h2>
          <div className="bg-[#251F1F] p-6 rounded-xl shadow-[0_0_12px_#393A3C]">
            <p className={`${handjet.className} leading-relaxed`}>
              L’accès au site est gratuit.<br />
              L’utilisateur s’engage à :
            </p>
            <ul
              className={`${handjet.className} list-disc ml-6 mt-2 space-y-2`}
            >
              <li>utiliser le site uniquement à des fins d’apprentissage ;</li>
              <li>ne pas tenter de nuire au fonctionnement du site ;</li>
              <li>respecter les autres utilisateurs.</li>
            </ul>
            <p className={`${handjet.className} mt-3`}>
              Tout abus peut entraîner la suspension du compte.
            </p>
          </div>
        </section>

        {/* Comptes et Sécurité */}
        <section className="mb-10">
          <h2
            className={`${silkscreen.className} text-2xl text-cyan-300 mb-3 drop-shadow-[0_0_6px_#393A3C]`}
          >
            • COMPTES ET SÉCURITÉ
          </h2>
          <div className="bg-[#251F1F] p-6 rounded-xl shadow-[0_0_12px_#393A3C]">
            <p className={`${handjet.className} leading-relaxed`}>
              Certaines fonctions nécessitent un compte.<br />
              L’utilisateur doit fournir des informations exactes et protéger
              ses identifiants.<br />
              Il est responsable de toute activité réalisée avec son compte.
            </p>
          </div>
        </section>

        {/* Propriété intellectuelle */}
        <section className="mb-10">
          <h2
            className={`${silkscreen.className} text-2xl text-cyan-300 mb-3 drop-shadow-[0_0_6px_#393A3C]`}
          >
            • PROPRIÉTÉ INTELLECTUELLE
          </h2>
          <div className="bg-[#251F1F] p-6 rounded-xl shadow-[0_0_12px_#393A3C]">
            <p className={`${handjet.className} leading-relaxed`}>
              Tout le contenu du site (cours, textes, images, code, design…)
              appartient à <strong>GamiCode</strong> ou à ses auteurs.<br />
              Toute copie, diffusion ou reproduction sans autorisation est
              strictement interdite.
            </p>
          </div>
        </section>

        {/* Données personnelles et cookies */}
        <section className="mb-10">
          <h2
            className={`${silkscreen.className} text-2xl text-cyan-300 mb-3 drop-shadow-[0_0_6px_#393A3C]`}
          >
            • DONNÉES PERSONNELLES ET COOKIES
          </h2>
          <div className="bg-[#251F1F] p-6 rounded-xl shadow-[0_0_12px_#393A3C]">
            <p className={`${handjet.className} leading-relaxed`}>
              <strong>GamiCode</strong> collecte uniquement les données
              nécessaires (ex : progression, connexion).<br />
              Elles ne sont ni revendues ni partagées sans consentement.<br />
              Le site peut utiliser des cookies pour améliorer l’expérience
              utilisateur.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
