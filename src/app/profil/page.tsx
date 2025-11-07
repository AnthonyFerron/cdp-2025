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

  const avatars = [
    "/avatars/alien1.png",
    "/avatars/alien2.png",
    "/avatars/alien4.png",
    "/avatars/alien3.png",
    "/avatars/alien5.png",
  ];

  const avatarsSelection = [
    "/avatars/avatars_selection/alien_selection1.png",
    "/avatars/avatars_selection/alien_selection2.png",
    "/avatars/avatars_selection/alien_selection3.png",
    "/avatars/avatars_selection/alien_selection4.png",
    "/avatars/avatars_selection/alien_selection5.png",
  ];

  const countries = [
    { id: "US", label: "🇺🇸 United States" },
    { id: "CA", label: "🇨🇦 Canada" },
    { id: "GB", label: "🇬🇧 United Kingdom" },
    { id: "FR", label: "🇫🇷 France" },
    { id: "DE", label: "🇩🇪 Germany" },
    { id: "IT", label: "🇮🇹 Italy" },
    { id: "ES", label: "🇪🇸 Spain" },
    { id: "RU", label: "🇷🇺 Russia" },
    { id: "CN", label: "🇨🇳 China" },
    { id: "JP", label: "🇯🇵 Japan" },
    { id: "KR", label: "🇰🇷 South Korea" },
    { id: "BR", label: "🇧🇷 Brazil" },
    { id: "AU", label: "🇦🇺 Australia" },
    { id: "IN", label: "🇮🇳 India" },
    { id: "MX", label: "🇲🇽 Mexico" },
    { id: "ZA", label: "🇿🇦 South Africa" },
    { id: "SA", label: "🇸🇦 Saudi Arabia" },
    { id: "NL", label: "🇳🇱 Netherlands" },
    { id: "SE", label: "🇸🇪 Sweden" },
    { id: "CH", label: "🇨🇭 Switzerland" }
  ];

  const [selectedCountry, setSelectedCountry] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedCountry(e.target.value);
  }

  const visibleCount = 3;
  const [startIndexBanners, setStartIndexBanners] = useState(0);
  const [startIndexAvatars, setStartIndexAvatars] = useState(0);

  const [selectedBanner, setSelectedBanner] = useState(banners[0]);
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);

  const nextBanners = () => {
    setStartIndexBanners((prev) => (prev + 1) % banners.length);
  };

  const prevBanners = () => {
    setStartIndexBanners((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const nextAvatars = () => {
    setStartIndexAvatars((prev) => (prev + 1) % avatars.length);
  };

  const prevAvatars = () => {
    setStartIndexAvatars((prev) => (prev - 1 + avatars.length) % avatars.length);
  };

  const visibleBanners = [];
  const visibleAvatarsSelection = [];

  for (let i = 0; i < visibleCount; i++) {
    visibleBanners.push(banners[(startIndexBanners + i) % banners.length]);
    visibleAvatarsSelection.push(avatarsSelection[(startIndexAvatars + i) % avatarsSelection.length]);
  }

  const centerBanner = visibleBanners[1];
  const centerAvatarSelection = visibleAvatarsSelection[1];

  return (
    <div className="font-[silkscreen] flex flex-col bg-[#2D2D2D] w-screen min-h-screen">
      <div className="w-full">
        <Image
          src={selectedBanner}
          alt=""
          width={600}
          height={0}
          className="object-cover w-full h-[250px] pixelated-rendering transition-transform duration-500 ease-in-out"
          style={{ transformOrigin: "center center" }}
        />
        <div className="flex mx-40 gap-5 -translate-y-1/2">
          <div>
            <Image
              src={selectedAvatar}
              width={150}
              height={150}
              alt={"avatar"}
              className="z-20 object-cover pixelated-rendering rounded-full"
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
              <div className={"flex gap-2"}>
                <h2 className="text-4xl font-bold text-white">Solid Snake</h2>
                <h2 className={"text-4xl"}>🇫🇷</h2>
              </div>
              <button
                onClick={() => {
                  const p = new URLSearchParams(params.toString());
                  if (hasAnyParam) {
                    p.forEach((_, key) => p.delete(key));
                  } else {
                    p.set("edit", "inventory");
                  }
                  router.push(`${window.location.pathname}?${p.toString()}`);
                }}
                className="outline-[#989AAF] outline-2 border-2 border-white rounded bg-[#DADCE7] shadow-[0px_2px_0px_2px_#666880] hover:shadow-none hover:translate-y-0.5 px-5 hover:cursor-pointer transition-transform duration-300"
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
      {(() => {
        switch (paramValue) {
          case "inventory":
            return (
              <div className={"flex flex-col text-white -translate-y-5 gap-5"}>
                <div className={"flex gap-2 text-xl justify-center w-full  font-bold"}>
                  <p>inventaire</p>
                  <p>|</p>
                  <a
                    onClick={() => {
                      const p = new URLSearchParams(params.toString());
                      p.set("edit", "informations");
                      router.push(`${window.location.pathname}?${p.toString()}`);
                    }}
                    className={"hover:cursor-pointer opacity-50"}
                  >
                    informations
                  </a>
                </div>
                <h2 className={"text-2xl underline ml-5 font-bold"}>Bannières</h2>
                <div className="relative w-full mx-auto h-[150px] mb-4 overflow-hidden">
                  <div className="flex gap-4 h-full">
                    {visibleBanners.map((src, idx) => (
                      <div
                        key={idx}
                        className="relative cursor-pointer rounded-3xl transition-transform duration-500 ease-in-out"
                        style={{
                          width: "33.33%",
                          height: "100%",
                          transform: idx === 1 ? "scale(1)" : "scale(0.75)",
                          zIndex: idx === 1 ? 10 : 1,
                        }}
                      >
                        <Image
                          src={src}
                          alt={`Image ${idx + 1}`}
                          fill
                          className="object-cover rounded-2xl pixelated-rendering"
                          sizes="33vw"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={prevBanners}
                    className="absolute top-1/2 h-full w-1/3 left-0 -translate-y-1/2 px-24 py-2 transition z-20 bg-gradient-to-l from-transparent to-[#2D2D2D]"
                  >
                    <Image src={"/assets/arrow_basic_w.png"} width={50} height={0} alt={""} />
                  </button>
                  <button
                    onClick={nextBanners}
                    className="absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-full flex items-center justify-end px-24 bg-gradient-to-r from-transparent to-[#2D2D2D] transition z-20"
                  >
                    <Image src={"/assets/arrow_basic_e.png"} width={50} height={50} alt="" />
                  </button>
                </div>
                <h2 className={"text-2xl underline ml-5 font-bold"}>Avatars</h2>
                <div className="relative w-full mx-auto h-[150px] mb-4 overflow-hidden">
                  <div className="flex gap-4 h-full">
                    {visibleAvatarsSelection.map((src, idx) => (
                      <div
                        key={idx}
                        className="relative cursor-pointer rounded-3xl transition-transform duration-500 ease-in-out"
                        style={{
                          width: "33.33%",
                          height: "100%",
                          transform: idx === 1 ? "scale(1)" : "scale(0.75)",
                          zIndex: idx === 1 ? 10 : 1,
                        }}
                      >
                        <Image
                          src={src}
                          alt={`Avatar ${idx + 1}`}
                          fill
                          className="object-cover rounded-2xl pixelated-rendering"
                          sizes="33vw"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={prevAvatars}
                    className="absolute top-1/2 h-full w-1/3 left-0 -translate-y-1/2 px-24 py-2 transition z-20 bg-gradient-to-l from-transparent to-[#2D2D2D]"
                  >
                    <Image src={"/assets/arrow_basic_w.png"} width={50} height={0} alt={""} />
                  </button>
                  <button
                    onClick={nextAvatars}
                    className="absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-full flex items-center justify-end px-24 bg-gradient-to-r from-transparent to-[#2D2D2D] transition z-20"
                  >
                    <Image src={"/assets/arrow_basic_e.png"} width={50} height={50} alt="" />
                  </button>
                </div>
                <div className="flex justify-center gap-4 mb-8">
                  <button
                    onClick={() => {
                      setSelectedBanner(centerBanner);
                      const selectedIndex = (startIndexAvatars + 1) % avatars.length;
                      setSelectedAvatar(avatars[selectedIndex]);
                    }}
                    className="outline-[#989AAF] outline-2 border-2 border-[#FFFFFF] rounded bg-[#DADCE7] shadow-[0px_2px_0px_2px_#666880] hover:shadow-none hover:translate-y-0.5 px-5 text-black"
                    type="button"
                  >
                    Appliquer
                  </button>
                </div>
              </div>
            );
          case "informations":
            return (
              <div className={"text-white -translate-y-5"}>
                <div className={"flex gap-2 text-xl justify-center w-full font-bold"}>
                  <a
                    onClick={() => {
                      const p = new URLSearchParams(params.toString());
                      p.set("edit", "inventory");
                      router.push(`${window.location.pathname}?${p.toString()}`);
                    }}
                    className={"hover:cursor-pointer opacity-50"}
                  >
                    inventaire
                  </a>
                  <p>|</p>
                  <p>informations</p>
                </div>
                <div className={"flex flex-col justify-evenly my-5 gap-5 items-center"}>
                  <div className={"flex flex-row justify-evenly gap-28"}>
                    <div className={"flex flex-col w-72"}>
                      <label htmlFor="name">nom d&#39;utilisateur</label>
                      <input type="text"
                             className={"bg-[#505157] py-1.5 border-2 rounded border-[#2D2D2D] outline-2 outline-[#505157] pl-5"}
                             value={"solid snake"} id={"name"}/>
                    </div>
                    <div className={"flex flex-col w-72"}>
                      <label htmlFor="email"> email</label>
                      <input type="email"
                             className={"bg-[#505157] py-1.5 border-2 rounded border-[#2D2D2D] outline-2 outline-[#505157] pl-5"}
                             value={"john.doe@gmail.com"} id={"email"}/>
                    </div>
                  </div>
                  <div className={"flex flex-row justify-evenly gap-28"}>
                    <div className={"flex flex-col w-72"}>
                      <label htmlFor="password">mot de passe</label>
                      <input type="password"
                             className={"bg-[#505157] py-1.5 border-2 rounded border-[#2D2D2D] outline-2 outline-[#505157] pl-5"}
                             value={"mybeautifyllpassword"} id={"password"}/>
                    </div>
                    <div className={"flex flex-col w-72"}>
                      <label htmlFor="country">pays</label>
                      <select
                        value={selectedCountry}
                        onChange={handleChange}
                        className="p-2 rounded bg-[#505157] text-white font-silkscreen border-2 border-[#2D2D2D] outline-2 outline-[#505157]"
                        id={"country"}
                      >
                        <option value="" disabled>
                          Choisissez un pays
                        </option>
                        {countries.map(({id, label}) => (
                          <option key={id} value={id}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button
                    className="outline-[#989AAF] outline-2 border-2 border-[#FFFFFF] rounded bg-[#DADCE7] shadow-[0px_2px_0px_2px_#666880] hover:shadow-none hover:translate-y-0.5 px-5 text-black w-fit"
                    type="button"
                  >
                    Appliquer
                  </button>
                </div>
                <div className={"flex flex-col ml-80"}>
                  <div>
                    <h2 className={"text-red-400 font-bold"}>zone danger</h2>
                  </div>
                  <div className={"text-white flex gap-10"}>
                    <button
                      className="outline-[#cd0b2a] outline-2 border-2 border-[#ff627b] rounded bg-[#ee2747] shadow-[0px_2px_0px_2px_#cd0b2a] hover:shadow-none hover:translate-y-0.5 px-5 w-fit"
                      type="button"
                    >
                      <>
                        supprimer le<br />compte
                      </>
                    </button>
                    <button
                      className="outline-[#cd0b2a] outline-2 border-2 border-[#ff627b] rounded bg-[#ee2747] shadow-[0px_2px_0px_2px_#cd0b2a] hover:shadow-none hover:translate-y-0.5 px-5 w-fit"
                      type="button"
                    >
                      <>
                        désactiver le<br />profil
                      </>
                    </button>
                  </div>
                </div>
              </div>
            );
          default:
            return (
              <div>
                <div className={"flex mx-40 flex-col gap-5 -translate-y-5"}>
                  <h2 className={"text-white font-bold text-2xl underline"}>Progression</h2>
                  <div className={"flex justify-between"}>
                    <div className={"flex gap-5"}>
                      <Image
                        src={"/logos/python_pixel.png"}
                        width={100}
                        height={0}
                        alt={"Logo Python"}
                        className={"pixelated-rendering"}
                      />
                      <div className={"text-white"}>
                        <h2 className={"text-3xl font-bold"}>python</h2>
                        <p>
                          complété à <span className={"font-bold"}>50</span>%
                        </p>
                        <p>
                          <span className={"font-bold"}>3</span> niveau réussis
                        </p>
                      </div>
                    </div>
                    <div className={"flex gap-5"}>
                      <Image
                        src={"/logos/html5_pixel.png"}
                        width={100}
                        height={0}
                        alt={"Logo HTML"}
                        className={"pixelated-rendering"}
                      />
                      <div className={"text-white"}>
                        <h2 className={"text-3xl font-bold"}>html</h2>
                        <p>
                          complété à <span className={"font-bold"}>50</span>%
                        </p>
                        <p>
                          <span className={"font-bold"}>3</span> niveau réussis
                        </p>
                      </div>
                    </div>
                    <div className={"flex gap-5"}>
                      <Image
                        src={"/logos/css_old_pixel.png"}
                        width={100}
                        height={0}
                        alt={"Logo CS"}
                        className={"pixelated-rendering"}
                      />
                      <div className={"text-white"}>
                        <h2 className={"text-3xl font-bold"}>css</h2>
                        <p>
                          complété à <span className={"font-bold"}>50</span>%
                        </p>
                        <p>
                          <span className={"font-bold"}>3</span> niveau réussis
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={"absolute bottom-0 left-0 w-full"}>
                  <div className={"flex justify-evenly"}>
                    <Image
                      src={"/assets/alienGreen_climb1.png"}
                      width={100}
                      height={0}
                      alt={"Alien standing"}
                    />
                    <Image
                      src={"/assets/alienGreen.png"}
                      width={100}
                      height={0}
                      alt={"Alien standing"}
                    />
                    <Image
                      src={"/assets/alienGreen_jump.png"}
                      width={100}
                      height={0}
                      alt={"Alien standing"}
                    />
                  </div>
                  <Image
                    src={"/assets/ground_profile.png"}
                    width={0}
                    height={0}
                    alt={""}
                    sizes={"100vw"}
                    className={"w-full"}
                  />
                </div>
              </div>
            );
        }
      })()}
    </div>
  );
}
