"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Header from "../../../composants/header/page";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const { error: resetError } = await authClient.forgetPassword({
        email,
        redirectTo: "/reset-password",
      });

      if (resetError) {
        setError("Erreur lors de l'envoi de l'email. Vérifiez votre adresse.");
      } else {
        setMessage(
          "Un email de réinitialisation a été envoyé à votre adresse !"
        );
        setEmail("");
      }
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  }

  return (
    <div>
      <Header />
      <div className="bg-[#1D1D1D] p-10 font-[silkscreen] min-h-screen flex flex-col items-center justify-center gap-8">
        <h1 className="bg-white text-center max-w-md w-full text-[48px] p-4 rounded-lg">
          Réinitialiser le mot de passe
        </h1>

        <form onSubmit={onSubmit} className="space-y-3 max-w-md w-full">
          {message && (
            <div className="bg-green-500 text-white p-4 rounded-lg text-center">
              {message}
            </div>
          )}
          {error && (
            <div className="bg-red-500 text-white p-4 rounded-lg text-center">
              {error}
            </div>
          )}
          <input
            className="text-2xl border p-4 w-full bg-white rounded-lg"
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="text-2xl border p-4 w-full bg-white rounded-lg mt-4"
          >
            Envoyer
          </button>
          <div className="text-center">
            <p className="text-white text-xl">La mémoire vous revient ?</p>
            <a className="text-blue-600 text-xl" href="/sign-in">
              Se connecter
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
