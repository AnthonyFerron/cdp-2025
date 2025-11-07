"use client";
import { useEffect, useMemo, useState } from "react";
import Header from "../../../composants/header/page";
import { FooterMini } from "../../../composants/footer/page";
import getMissions from "../requests/user/mission/getMissions";
import { Achieved } from "../models/achieved.model";
import getAchievedMissions from "../requests/user/achieved/getAchievedMissions";
import { authClient } from "@/lib/auth-client";
import { IdMission, IdUser } from "../types/custom.types";
import { Mission } from "../models/mission.model";


export default function MissionsPage() {

  const [userId, setUserId] = useState<string | null>(null);
  const [missions, setMissions] = useState<Mission[]>([])
  const [missionsAchieved, setMissionsAchieved] = useState<Achieved[]>([]);
  const [loading, setLoading] = useState(true);
  const [completedCount, setCompletedCount] = useState(0);

  const loadMissions = async () => {
    const res = await getMissions()

    if (res) {
      setMissions(res)
    }
  }

  useEffect(() => {
    loadMissions()
  }, [])

  const numberMissionsFinished = useMemo(() => {
    if (missionsAchieved) {
      return missionsAchieved.filter(m => m.isCompleted).length
    }
    return 0
  }, [missionsAchieved])

  const handleMissionFinished = (idMission: IdMission) => {
    return missionsAchieved.some(m => m.idMission === idMission && m.isCompleted)
  }

  useEffect(() => {
    const loadMissionsAchieved = async () => {
      setLoading(true);
      try {
        const missionsData = await getAchievedMissions(userId as IdUser);
        if (missionsData) {
          setMissionsAchieved(missionsData);
          setCompletedCount(0);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des missions:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMissionsAchieved();
  }, [userId]);

  useEffect(() => {
    const fetchUser = async () => {
      const session = await authClient.getSession();
      if (session?.data?.user) {
        setUserId(session.data.user.id);
      }
    };
    fetchUser();
  }, []);

  const progressPercentage = missionsAchieved.length > 0 ? (completedCount / missionsAchieved.length) * 100 : 0;

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

        <div className="h-[50px]"></div>

        <div className="w-full max-w-3xl">
          <h2 className="text-[#5AB2F3] text-2xl font-bold mb-3">
            MISSIONS ACCOMPLIES : {numberMissionsFinished}/{missionsAchieved.length}
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
              key={mission.idMission}
              className={`${
                handleMissionFinished(mission.idMission) ? "bg-[#5AB2F3]" : "bg-[#F6F4EF]"
              } text-black w-full max-w-3xl rounded-lg px-6 py-4 mb-6 shadow-md`}
            >
              <h3 className="text-xl mb-2 text-center">
                {mission.title.toUpperCase()} :
              </h3>
              <p className="text-sm leading-relaxed text-center mb-4">
                {mission.content}
              </p>
              <p className="text-right text-md font-bold">
                {mission.rewardXp ? `${mission.rewardXp} XP` : ""}
                {mission.rewardXp && mission.rewardCoins ? " + " : ""}
                {mission.rewardCoins ? `${mission.rewardCoins} coins` : ""}
              </p>
            </div>
          ))
        )}
      </div>
      <FooterMini />
    </div>
  );
}
