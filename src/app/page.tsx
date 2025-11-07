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
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white sm:items-start">
        <h1 className="text-5xl font-bold text-zinc-900 sm:text-6xl">
          Chargement...
        </h1>
      </main>
    </div>
  );
}
