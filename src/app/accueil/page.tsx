"use client";
import { FooterMini } from "../../../composants/footer/page";
import Header from "../../../composants/header/page";

export default function SignInPage() {
  return (
    <div className="bg-[#1D1D1D] min-h-screen text-white font-[silkscreen]">
      <HeaderMini />

      {/* Section bannière */}
      <div className="relative bg-[url('/bg2.jpg')] bg-cover bg-center py-16 px-8 text-center">
        <img src="logo.png" alt="logo" className="mx-auto w-1/3 mb-6" />
        <p className="text-lg sm:text-2xl font-light max-w-3xl mx-auto mb-12">
          Bienvenue sur <span className="font-bold">GamiCode</span>, le site
          d’apprentissage pour maîtriser{" "}
          <span className="">HTML</span>,{" "}
          <span className="">CSS</span> et{" "}
          <span className="">Python</span> à ton rythme.
        </p>

        {/* Bouton sur la bannière */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-6">
          <a
            href="/sign-in"
            className="inline-block bg-black border border-white px-8 py-3 rounded-md hover:bg-white hover:text-black transition"
          >
            COMMENCER DÈS MAINTENANT
          </a>
        </div>
      </div>

      {/* Section principale */}
      <div className="grid md:grid-cols-2 gap-16 px-8 py-20">
        {/* Langages */}
        <div className="flex justify-center items-center">
          <img className="w-1/2" src="langages.png" alt="langages" />
        </div>
        <div className="bg-[#FFFFFF] text-black rounded-2xl p-10 shadow-xl border border-gray-300 relative overflow-hidden">
          <div className="flex justify-center mb-6">
            <h2 className="bg-[#E5E7EB] border-2 border-black rounded-md px-6 py-2 text-lg font-bold uppercase shadow-md">
              DES LANGAGES ESSENTIELS
            </h2>
          </div>
          <p className="leading-relaxed text-justify text-lg">
            Vous apprenez trois langages essentiels : HTML, CSS et Python. Ils
            vous permettent de créer des pages web complètes, de les styliser
            avec professionnalisme et d’y ajouter de la logique pour automatiser
            ou développer des mini-programmes.
          </p>
        </div>

        {/* Exercices réels */}
        <div className="bg-white text-black rounded-2xl p-10 shadow-xl border border-gray-300 relative overflow-hidden">
          <div className="flex justify-center mb-6">
            <h2 className="bg-[#E5E7EB] border-2 border-black rounded-md px-6 py-2 text-lg font-bold uppercase shadow-md">
              DES EXERCICES RÉELS
            </h2>
          </div>
          <p className="leading-relaxed text-justify text-lg">
            Vous avez accès à plusieurs exercices pratiques conçus pour vous
            faire progresser pas à pas. Ces défis vous permettent d’améliorer
            votre logique, de renforcer vos compétences en programmation et de
            créer des projets concrets.
          </p>
        </div>
        <div className="bg-[#13ADDC] text-black rounded-2xl p-10 shadow-xl border border-gray-300 relative overflow-hidden">
          <img className="w-2/2" src="component.png" alt="component" />
        </div>

        {/* Progression */}
        <div className="flex justify-center items-center">
          <img className="w-1/2" src="aliens.png" alt="aliens" />
        </div>
        <div className="bg-white text-black rounded-2xl p-10 shadow-xl border border-gray-300 relative overflow-hidden">
          <div className="flex justify-center mb-6">
            <h2 className="bg-[#E5E7EB] border-2 border-black rounded-md px-6 py-2 text-lg font-bold uppercase shadow-md">
              UNE PROGRESSION LINÉAIRE
            </h2>
          </div>
          <p className="leading-relaxed text-justify text-lg">
            Rejoignez une communauté active qui progresse chaque jour dans
            l’apprentissage du développement web/Python. Que vous soyez
            débutant ou déjà passionné, vous apprendrez aux côtés d’autres
            membres motivés, partageant leurs projets, leurs questions et leurs
            réussites pour progresser ensemble dans la programmation.
          </p>
        </div>
      </div>

      {/* Bouton final */}
      <div className="text-center py-12">
        <a
          href="/sign-in"
          className="inline-block bg-white text-black border-2 border-black px-8 py-3 rounded-lg hover:bg-black hover:text-white transition"
        >
          COMMENCER DÈS MAINTENANT
        </a>
         <FooterMini />
      </div>
  
    </div>
    
  );
}
