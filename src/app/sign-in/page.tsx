"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Header from "../../../composants/header/page";

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
    <div>
      <Header />
      <div className="bg-[#1D1D1D] p-10 font-[silkscreen] min-h-screen flex flex-col items-center justify-center gap-8">
        <h1 className="bg-white text-center max-w-md w-full text-[48px] p-4 rounded-lg">Se connecter</h1>

        <form onSubmit={onSubmit} className="space-y-3 max-w-md w-full">
          <input
            className="text-2xl border p-4 w-full bg-white rounded-lg"
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="text-2xl border p-4 w-full bg-white rounded-lg"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="text-center">
            <span className="text-white text-xl">Pas de compte ? </span>
            <a className="text-blue-600 text-xl" href="/sign-up">Inscrivez-vous</a>
          </div>
          <button type="submit" className="text-2xl border p-4 w-full bg-white rounded-lg mt-4">
            Connexion
          </button>
          <div className="text-center">
            <span className="text-white text-xl">Mot de passe oublié ? </span>
            <a className="text-blue-600 text-xl" href="/reset">Récupération</a>
          </div>
        </form>
      </div>
    </div>
  );
}