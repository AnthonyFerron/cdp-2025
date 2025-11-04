"use client";
import Header from "@/composants/header/header";
import Footer from "@/composants/header/footer";


export default function Accueil() {

  return (
    <div>
      <Header />
      <div className="relative w-full h-[100%] bg-[url('/bg1.png')] bg-cover bg-center pb-2 pt-4">
        <div className="w-[75%] mx-auto text-center m-4 p-2 rounded-[15px] bg-[#121010] border-[#FAF2EA] border-2">
          <h1 className="md:text-7xl text-[#13ADDC] border-b-1 ">GamiCode</h1>
          <p className="md:text-3xl text-[#8BF37B]">Bienvenue sur Gamicode, le site d’apprentissage pour maîtriser HTML, CSS et Python à ton rythme.</p>
          <a className="md:text-2xl text-[#13ADDC] border-2 rounded-[15px] p-1" href="#">Commencer dès maintenant</a>
        </div>
        <div className="md:grid grid-cols-3 w-[75%] mx-auto">
          <div className="text-center m-4 p-2 rounded-[15px] bg-[#121010] border-[#FAF2EA] border-2">
            <h1 className="md:text-4xl text-[#13ADDC] border-b-1 ">Nombre de langages appris</h1>
            <p className="md:text-3xl text-[#8BF37B] mt-2">Tu apprends 3 langages essentiels : HTML, CSS et Python. Ce trio te permet de construire des pages web complètes, de les styliser de façon professionnelle, puis d'ajouter de la logique et des scripts intelligents pour automatiser des tâches ou créer des mini-programmes.</p>
          </div>
          <div className="text-center m-4 p-2 rounded-[15px] bg-[#121010] border-[#FAF2EA] border-2">
            <h1 className="md:text-4xl text-[#13ADDC] border-b-1 ">Nombre d'exercices</h1>
            <p className="md:text-3xl text-[#8BF37B] mt-2">Tu as accès à plusieurs exercices pratiques, conçus pour progresser étape par étape. Ces défis te permettent de pratiquer régulièrement, d’améliorer ta logique de code et de renforcer tes compétences en programmation tout en construisant des projets concrets.</p>
          </div>
          <div className="text-center m-4 p-2 rounded-[15px] bg-[#121010] border-[#FAF2EA] border-2">
            <h1 className="md:text-4xl text-[#13ADDC] border-b-1 ">Nombre d'utilisateurs</h1>
            <p className="md:text-3xl text-[#8BF37B] mt-2">Rejoins une communauté de plus de 10 000 apprenants actifs qui progressent chaque jour dans l’apprentissage du développement web et de Python.Que tu sois débutant ou déjà passionné par le code, tu apprends aux côtés d’autres utilisateurs motivés, partageant leurs questions, leurs projets et leurs réussites, pour avancer ensemble dans la logique et la pratique du programmation</p>
          </div>
        </div>
        <div className="grid grid-cols-5 text-white text-center text-xs mx-12">
          <a className="md:text-3xl" href="">Contact</a>
          <a className="md:text-3xl" href="">Mon profil</a>
          <a className="md:text-3xl" href="">CGV</a>
          <a className="md:text-3xl" href="">CGU</a>
          <a className="md:text-3xl" href="">Confidentialité</a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
