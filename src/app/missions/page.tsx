"use client";
import { useEffect, useState } from "react";
import Header from "../../../composants/header/page";
import { FooterMini } from "../../../composants/footer/page";
import getMissions from "../requests/user/mission/getMissions";
import { Mission } from "@prisma/client";

export default function MissionsPage() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const loadMissions = async () => {
      setLoading(true);
      try {
        const missionsData = await getMissions();
        if (missionsData) {
          setMissions(missionsData);
          setCompletedCount(0);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des missions:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMissions();
  }, []);

  const totalMissions = missions.length;
  const progressPercentage =
    totalMissions > 0 ? (completedCount / totalMissions) * 100 : 0;

  if (loading) {
    return (
      <div className="bg-[#1D1D1D] min-h-screen">
        <Header />
        <div className="flex items-center justify-center h-screen text-white">
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1D1D1D]">
      <div className="min-h-screen bg-[#1D1D1D] text-black font-[silkscreen] flex flex-col items-center py-10 px-4">
        <Header />
        <div className="bg-[#F6F4EF] rounded-lg px-10 py-4 text-3xl text-center mb-8 mt-10">
          MISSIONS :
        </div>

        <div className="w-full max-w-3xl">
          <h2 className="text-[#5AB2F3] text-2xl font-bold mb-3">
            MISSIONS ACCOMPLIES : {completedCount}/{totalMissions}
          </h2>

          <div className="w-full bg-[#5AB2F3] rounded-full h-4 shadow-inner mb-10">
            <div
              className="h-4 bg-[#5AB2F3] rounded-full"
              style={{ width: `${progressPercentage}%` }}
            >
              <div
                className="h-4 bg-[#5AF35A] rounded-full absolute"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {missions.length === 0 ? (
          <div className="text-white text-xl">
            Aucune mission disponible pour le moment.
          </div>
        ) : (
          missions.map((mission, index) => (
            <div
              key={mission.id_mission}
              className={`${
                index === 0 ? "bg-[#5AB2F3]" : "bg-[#F6F4EF]"
              } text-black w-full max-w-3xl rounded-lg px-6 py-4 mb-6 shadow-md`}
            >
              <h3 className="text-xl mb-2 text-center">
                {mission.title.toUpperCase()} :
              </h3>
              <p className="text-sm leading-relaxed text-center mb-4">
                {mission.content}
              </p>
              <p className="text-right text-md font-bold">
                {mission.reward_xp ? `${mission.reward_xp} XP` : ""}
                {mission.reward_xp && mission.reward_coins ? " + " : ""}
                {mission.reward_coins ? `${mission.reward_coins} coins` : ""}
              </p>
            </div>
          ))
        )}
      </div>
      <FooterMini />
    </div>
  );
}
