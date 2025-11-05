"use client";

export default function SignInPage() {
  return (
    <div className="bg-black">
      <div className="bg-[url(/bg2.jpg)] h-auto bg-center pb-8 px-12">
        <img src="logo.png" alt="" className="mx-auto w-2/4" />
        <div className="text-center">
          <p className="text-2xl font-bold text-white sm:text-4xl mb-4 pb-4">
            Bienvenue sur Gamicode, le site d’apprentissage pour maîtriser HTML,
            CSS et Python à ton rythme.
          </p>
          <a type="submit" className="text-white border p-2 bg-black">
            commencer dès maintenant
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-24 px-16">
        <div className="p-8">
          <img className="mx-auto w-1/4" src="langages.png" alt="" />
        </div>
        <div className="bg-white rounded-xl p-8 ">
          <h6 className=" text-center">Des langages essentiels</h6>
          <p className="text-2xl">
            Vous apprenez trois langages essentiels : HTML, CSS et Python. Ils
            vous permettent de créer des pages web complètes, de les styliser
            avec professionnalisme et d'y ajouter de la logique pour automatiser
            ou développer des mini-programmes.
          </p>
        </div>
        <div className="bg-white rounded-xl p-8">
          <h1 className=" text-center">Des exercices réels</h1>

          <p className=" text-2xl">
            Vous avez accès à plusieurs exercices pratiques conçus pour vous
            faire progresser pas à pas. Ces défis vous permettent d'améliorer
            votre logique, de renforcer vos compétences en programmation et de
            créer des projets concrets.
          </p>
        </div>
        <div className="p-8">
          <img className="mx-auto w-1/4" src="langages.png" alt="" />
        </div>
        <div className="p-8">
          <img className="mx-auto w-2/4" src="aliens.png" alt="" />
        </div>
        <div className="bg-white rounded-xl p-8">
          <h1 className=" text-center">Une progession linéaire</h1>
          <p className="text-2xl">
            Rejoignez une communauté actifs qui progressent chaque jour dans
            l'apprentissage du développement web/Python. Que vous soyez débutant
            ou déjà passionné, vous apprendrez aux côtés d'autres membres
            motivés, partageant leurs projets, leurs questions et leurs
            réussites pour progresser ensemble dans la programmation.
          </p>
        </div>
      </div>
      <div className="h-auto bg-center pb-8 px-12">
        <img src="logo.png" alt="" className="mx-auto w-2/4" />
        <div className="text-center">
          <a type="submit" className="text-black border p-2 bg-white">
            commencer dès maintenant
          </a>
        </div>
      </div>
    </div>
  );
}
