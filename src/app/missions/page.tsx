"use client";
import Header from "../../../composants/header/page";
import { FooterMini } from "../../../composants/footer/page";
export default function MissionsPage() {
  return (
    <div className="bg-[#1D1D1D]">
      <div className="min-h-screen bg-[#1D1D1D] text-black font-[silkscreen] flex flex-col items-center py-10 px-4">
        <Header />
        {/* Titre principal */}
        <div className="bg-[#F6F4EF] rounded-lg px-10 py-4 text-3xl text-center mb-8 mt-10">
          MISSIONS DU JOUR :
        </div>

        {/* Sous-titre + barre de progression */}
        <div className="w-full max-w-3xl">
          <h2 className="text-[#5AB2F3] text-2xl font-bold mb-3">
            MISSIONS ACCOMPLIES : 1/3
          </h2>

          {/* Barre de progression */}

          <div className="w-full bg-[#5AB2F3] rounded-full h-4 shadow-inner mb-10">
            <div
              className="h-4 bg-[#5AB2F3] rounded-full"
              style={{ width: "33%" }}
            >
              <div
                className="h-4 bg-[#5AF35A] rounded-full absolute"
                style={{ width: "33%" }}
              ></div>
            </div>

          </div>
        </div>

        {/* Mission 1 */}
        <div className="bg-[#5AB2F3] text-black w-full max-w-3xl rounded-lg px-6 py-4 mb-6 shadow-md">
          <h3 className="text-xl mb-2 text-center">MISSION 1 :</h3>
          <p className="text-sm leading-relaxed text-center mb-4">
            APUD HAS GENTES, QUARUM EXORDIENS INITIUM AB ASSYRIIS AD NILI
            CATARACTAS PORRIGITUR ET CONFINIA BLEMMYARUM, OMNES PAR
          </p>
          <p className="text-right text-md font-bold">250 XP</p>
        </div>

        {/* Mission 2 */}
        <div className="bg-[#F6F4EF] text-black w-full max-w-3xl rounded-lg px-6 py-4 mb-6 shadow-md">
          <h3 className="text-xl mb-2 text-center">MISSION 2 :</h3>
          <p className="text-sm leading-relaxed text-center mb-4">
            APUD HAS GENTES, QUARUM EXORDIENS INITIUM AB ASSYRIIS AD NILI
            CATARACTAS PORRIGITUR ET CONFINIA BLEMMYARUM, OMNES PAR
          </p>
          <p className="text-right text-md font-bold">500 XP</p>
        </div>

        {/* Mission 3 */}
        <div className="bg-[#F6F4EF] text-black w-full max-w-3xl rounded-lg px-6 py-4 mb-6 shadow-md">
          <h3 className="text-xl mb-2 text-center">MISSION 3 :</h3>
          <p className="text-sm leading-relaxed text-center mb-4">
            APUD HAS GENTES, QUARUM EXORDIENS INITIUM AB ASSYRIIS AD NILI
            CATARACTAS PORRIGITUR ET CONFINIA BLEMMYARUM, OMNES PAR
          </p>
          <p className="text-right text-md font-bold">1000 XP</p>
        </div>
      </div>
      <FooterMini />
    </div>
  );
}
