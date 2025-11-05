"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";
import Header from "../../../composants/page";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (!token) {
      setError("Token de réinitialisation invalide.");
      return;
    }

    try {
      const { error: resetError } = await authClient.resetPassword({
        newPassword: password,
        token: token,
      });

      if (resetError) {
        setError(
          "Erreur lors de la réinitialisation. Le lien a peut-être expiré."
        );
        console.error("Reset error:", resetError);
      } else {
        setMessage("Mot de passe réinitialisé avec succès !");
        setTimeout(() => {
          window.location.href = "/sign-in";
        }, 2000);
      }
    } catch (err) {
      console.error("Catch error:", err);
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  }

  return (
    <div>
      <Header />
      <div className="bg-[#1D1D1D] p-10 font-[silkscreen] min-h-screen flex flex-col items-center justify-center gap-8">
        <h1 className="bg-white text-center max-w-md w-full text-[48px] p-4 rounded-lg">
          Nouveau mot de passe
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
            type="password"
            value={password}
            placeholder="Nouveau mot de passe"
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={!token}
          />

          <input
            className="text-2xl border p-4 w-full bg-white rounded-lg"
            type="password"
            value={confirmPassword}
            placeholder="Confirmer le mot de passe"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={!token}
          />

          <button
            type="submit"
            className="text-2xl border p-4 w-full bg-white rounded-lg mt-4 disabled:opacity-50"
            disabled={!token}
          >
            Réinitialiser
          </button>

          <div className="text-center">
            <a className="text-blue-600 text-xl" href="/sign-in">
              Retour à la connexion
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
