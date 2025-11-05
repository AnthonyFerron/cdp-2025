"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Header from "../../../composants/page";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await authClient.signUp.email({
      email,
      password,
      name: email.split("@")[0] || "",
    });
    if (!error) window.location.href = "/";
  }

  return (
    <div>
      <Header />
      <div className="bg-[#1D1D1D] p-10 font-[silkscreen] min-h-screen flex flex-col items-center justify-center gap-8">
        <h1 className="bg-white text-center max-w-md w-full text-[48px] p-4 rounded-lg">
          S'inscrire
        </h1>

        <form onSubmit={onSubmit} className="space-y-3 max-w-md w-full">
          <input
            className="text-2xl border p-4 w-full bg-white rounded-lg"
            type="email"
            placeholder="Pseudo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="text-2xl border p-4 w-full bg-white rounded-lg"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="text-2xl border p-4 w-full bg-white rounded-lg"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="text-center">
            <span className="text-white text-xl">Déjà un compte ? </span>
            <a className="text-blue-600 text-xl" href="/sign-in">Connectez-vous</a>
          </div>

          <button
            type="submit"
            className="text-2xl border p-4 w-full bg-white rounded-lg mt-4"
          >
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
}
