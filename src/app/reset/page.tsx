"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await authClient.signIn.email({
      email,
      password,
      // callbackURL: "/", rememberMe: true (optionnels)
    });
    if (!error) window.location.href = "/";

  }

  return (
    <div className="bg-[#1D1D1D] p-10 font-[silkscreen] min-h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="bg-white text-center max-w-md w-full text-[48px] p-4 rounded-lg">Réinitialiser le mot de passe</h1>

      <form onSubmit={onSubmit} className="space-y-3 max-w-md w-full">
        <input
          className="text-2xl border p-4 w-full bg-white rounded-lg"
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="text-2xl border p-4 w-full bg-white rounded-lg mt-4">
          Envoyer
        </button>
        <div className="text-center">
          <p className="text-white text-xl">Le mémoire vous revient ?</p>
          <a className="text-blue-600 text-xl" href="/sign-in">Se connecter</a>
        </div>
      </form>
    </div>
  );
}