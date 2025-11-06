"use client";
import { FooterMini } from "../../../composants/footer/page";
import { HeaderMini } from "../../../composants/header/page";

export default function Accueil() {
  return (
    <div className="font-[silkscreen] bg-[#0e0f12] text-gray-300">
      <HeaderMini />

      <div className="min-h-screen p-6 md:p-12">

        <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-[#00c6ff] mb-10 mx-auto w-fit">
         Conditions Générales d’Utilisation
        </h1>

        <section className="mb-10">
          <h2 className="text-lg font-semibold text-[#00c6ff] mb-2">• Objet du site</h2>
          <div className="bg-[#251F1F] rounded-xl p-6 text-sm leading-relaxed">
            GamiCode est une plateforme d’apprentissage du code (HTML, CSS, Python) avec cours, exercices et mini-jeux éducatifs.  L’objectif est d’apprendre la programmation de façon ludique et progressive. </div>
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-semibold text-[#00c6ff] mb-2">• DONNÉES COLLECTÉES</h2>
          <div className="bg-[#251F1F] rounded-xl p-6 text-sm leading-relaxed">
            Nous pouvons collecter les informations suivantes :<br /><br />
            1. Vos informations personnelles : nom, prénom, adresse e-mail, téléphone.<br />
            2. Vos données techniques : adresse IP, type d’appareil, navigateur.
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-semibold text-[#00c6ff] mb-2">• PARTAGE DES DONNÉES</h2>
          <div className="bg-[#251F1F] rounded-xl p-6 text-sm leading-relaxed">
            Nous ne partageons pas vos données avec des tiers, sauf :<br /><br />
            • Les prestataires techniques indispensables (paiement, hébergement, e-mail).<br />
            • Les autorités compétentes, uniquement si la loi l’exige.
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-semibold text-[#00c6ff] mb-2">• CONSERVATION ET SÉCURITÉ</h2>
          <div className="bg-[#251F1F] rounded-xl p-6 text-sm leading-relaxed">
            Vos données sont conservées pendant la durée nécessaire à la gestion de vos réservations.<br /><br />
            Nous mettons en place des mesures de sécurité techniques et organisationnelles pour les protéger.
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-semibold text-[#00c6ff] mb-2">• VOS DROITS</h2>
          <div className="bg-[#251F1F] rounded-xl p-6 text-sm leading-relaxed">
            Vous disposez d’un droit d’accès, de rectification, de suppression et d’opposition à vos données.<br /><br />
            Pour exercer ces droits, contactez-nous à : [adresse e-mail de contact].
          </div>
        </section>

      </div>

      <FooterMini />
    </div>
  );
}
