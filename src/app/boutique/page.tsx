"use client";
import Header from "@/composants/header/header";


export default function Accueil() {

  return (
    <div className="bg-[#2D2D2D] h-screen">
      <Header />
      <div className="grid grid-cols-2 pt-16 gap-y-10">
        <div className="mx-auto w-fit">
          <img className="rounded-lg" src="alien_vert.png" alt="" />
          <div className="grid grid-cols-2 text-white">
            <p>Alien vert</p>
            <div className="inline text-right">
              <p className="inline">500</p>
              <img className="inline" src="coins.png" alt="" />
            </div>
          </div>
        </div>
        <div className="mx-auto w-fit">
          <img className="rounded-lg" src="alien_beige.png" alt="" />
          <div className="grid grid-cols-2 text-white">
            <p>Alien beige</p>
            <div className="inline text-right">
              <p className="inline">500</p>
              <img className="inline" src="coins.png" alt="" />
            </div>
          </div>
        </div>
        <div className="mx-auto w-fit">
          <img className="rounded-lg" src="alien_jaune.png" alt="" />
          <div className="grid grid-cols-2 text-white">
            <p>Alien jaune</p>
            <div className="inline text-right">
              <p className="inline">500</p>
              <img className="inline" src="coins.png" alt="" />
            </div>
          </div>
        </div>
        <div className="mx-auto w-fit">
          <img className="rounded-lg" src="alien_bleu.png" alt="" />
          <div className="grid grid-cols-2 text-white">
            <p>Alien bleu</p>
            <div className="inline text-right">
              <p className="inline">500</p>
              <img className="inline" src="coins.png" alt="" />
            </div>
          </div>
        </div>
        <div className="mx-auto w-fit">
          <img className="rounded-lg" src="alien_rose.png" alt="" />
          <div className="grid grid-cols-2 text-white">
            <p>Alien rose</p>
            <div className="inline text-right">
              <p className="inline">500</p>
              <img className="inline" src="coins.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
