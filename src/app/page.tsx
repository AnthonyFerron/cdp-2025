"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Rediriger vers la page d'accueil
    router.push("/accueil");
  }, [router]);

  return (
    <div className="font-[silkscreen] flex items-center justify-center bg-[#2D2D2D] w-screen min-h-screen text-white">
        <p>Chargement...</p>
    </div>
  );
}
