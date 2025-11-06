"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Profil() {
  const router = useRouter();
  const params = useSearchParams();
  const paramValue = params.get("edit");

  const hasAnyParam = params.toString() !== "";

  const level = 1;
  const currentXP = 100;
  const nextLevelXP = 800;
  const progressPercent = Math.min(100, Math.floor((currentXP / nextLevelXP) * 100));

  const banners = [
    "/cosmetiques/bannieres/banner1.jpg",
    "/cosmetiques/bannieres/banner2.jpg",
    "/cosmetiques/bannieres/banner3.jpg",
    "/cosmetiques/bannieres/banner4.jpg",
    "/cosmetiques/bannieres/banner5.jpg",
  ];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const prev = () => setSelectedIndex((s) => Math.max(0, s - 1));
  const next = () => setSelectedIndex((s) => Math.min(banners.length - 1, s + 1));

  return (
    <div className="font-[silkscreen] flex flex-col bg-[#2D2D2D] h-screen w-screen">
      <div className="w-full">
        <Image
          src={banners[selectedIndex]}
          alt={"Bannière #" + (selectedIndex + 1)}
          width={600}
          height={0}
          className="object-cover w-full h-[250px] pixelated-rendering"
        />
        <div className="flex mx-40 gap-5 -translate-y-1/2">
          <div>
            <Image
              src="/avatars/alien_vert.png"
              width={150}
              height={150}
              alt={"avatar"}
              className="z-20 object-cover pixelated-rendering"
            />
          </div>
          <div className="flex flex-col justify-between gap-5 w-full ">
            <div className="flex items-center gap-5 mb-3 w-full">
              <div className="flex items-center gap-2 translate-y-2">
                <Image src={"/badges/gold_html2.png"} width={20} height={20} alt={"🥇"} />
                <Image src={"/badges/gold_css2.png"} width={20} height={20} alt={"🥇"} />
                <Image src={"/badges/gold_python2.png"} width={20} height={20} alt={"🥇"} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between text-white text-sm mb-1">
                  <p>Niveau {level}</p>
                  <p>{currentXP} / {nextLevelXP} XP</p>
                </div>
                <div className="h-3 w-full bg-gray-700 rounded-full border border-white">
                  <div
                    className="h-full bg-green-500 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between relative w-full mx-auto h-16">
              <h2 className="text-4xl font-bold text-white">Solid Snake</h2>
              <button
                onClick={() => {
                  const p = new URLSearchParams(params.toString());
                  if (hasAnyParam) {
                    // Supprime tous les paramètres
                    p.forEach((_, key) => p.delete(key));
                  } else {
                    // Ajoute un paramètre par défaut
                    p.set("edit", "inventory");
                  }
                  router.push(`${window.location.pathname}?${p.toString()}`);
                }}
                className="outline-[#989AAF] outline-2 border-2 border-white rounded bg-[#DADCE7] shadow-[0px_2px_0px_2px_#666880] hover:shadow-none hover:translate-y-0.5 px-5 hover:cursor-pointer"
                type="button"
              >
                {hasAnyParam ? (
                  "annuler"
                ) : (
                  <>
                    modifier<br />le profil
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*Affichage profil normal*/}
      {
        (() => {
          switch (paramValue) {
            case "inventory":
              return <p>Chargement...</p>;
            case "informations":
              return <p>Succès !</p>;
            default:
              return <div className={""}>
                <div className={"flex mx-40 flex-col gap-5 -translate-y-5"}>
                  <h2 className={"text-white font-bold text-2xl underline"}>Progression</h2>
                  <div className={"flex justify-between"}>
                    <div className={"flex gap-5"}>
                      <Image src={"/logos/python_pixel.png"} width={100} height={0} alt={"Logo Python"}
                             className={"pixelated-rendering"}></Image>
                      <div className={"text-white"}>
                        <h2 className={"text-3xl font-bold"}>python</h2>
                        <p>complété à <span className={"font-bold"}>50</span>%</p>
                        <p><span className={"font-bold"}>3</span> niveau réussis</p>
                      </div>
                    </div>
                    <div className={"flex gap-5"}>
                      <Image src={"/logos/html5_pixel.png"} width={100} height={0} alt={"Logo HTML"}
                             className={"pixelated-rendering"}></Image>
                      <div className={"text-white"}>
                        <h2 className={"text-3xl font-bold"}>html</h2>
                        <p>complété à <span className={"font-bold"}>50</span>%</p>
                        <p><span className={"font-bold"}>3</span> niveau réussis</p>
                      </div>
                    </div>
                    <div className={"flex gap-5"}>
                      <Image src={"/logos/css_old_pixel.png"} width={100} height={0} alt={"Logo CS"}
                             className={"pixelated-rendering"}></Image>
                      <div className={"text-white"}>
                        <h2 className={"text-3xl font-bold"}>css</h2>
                        <p>complété à <span className={"font-bold"}>50</span>%</p>
                        <p><span className={"font-bold"}>3</span> niveau réussis</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={"absolute bottom-0 left-0 w-full"}>
                  <div className={"flex justify-evenly"}>
                    <Image src={"/assets/alienGreen_climb1.png"} width={100} height={0} alt={"Alien standing"}></Image>
                    <Image src={"/assets/alienGreen.png"} width={100} height={0} alt={"Alien standing"}></Image>
                    <Image src={"/assets/alienGreen_jump.png"} width={100} height={0} alt={"Alien standing"}></Image>
                  </div>
                  <Image src={"/assets/ground_profile.png"} width={0} height={0} alt={""} sizes={"100vw"}
                         className={"w-full"}></Image>
                </div>
              </div>;

          }
        })()
      }
      {/* Affichage profil modification inventaire */}
      {/* Affichage profil modification informations */}
    </div>
  );
}
