"use client";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import Header from "../../../composants/header/page";
import updateAchievedMission from "../requests/user/achieved/updateAchievedMission";

type Country = {
  id_country: number;
  name: string;
  image: string;
};

export default function SignUpPage() {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<number>(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch countries on component mount
    fetch("/backend/api/country")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data.countries);
        if (data.countries.length > 0) {
          setSelectedCountry(data.countries[0].id_country);
        }
      })
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!pseudo.trim()) {
      setError("Le pseudo est requis.");
      return;
    }

    if (!email.trim()) {
      setError("L'email est requis.");
      return;
    }

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (selectedCountry === 0) {
      setError("Veuillez sélectionner un pays.");
      return;
    }

    try {
      const { error: signUpError } = await authClient.signUp.email({
        email,
        password,
        name: pseudo || email.split("@")[0] || "",
        // @ts-expect-error - adding custom field for country
        id_country: selectedCountry,
      });

      if (signUpError) {
        setError(
          "Erreur lors de la création du compte. L'email est peut-être déjà utilisé."
        );
        console.error("SignUp error:", signUpError);
      } else {
        // !!!!!!!!! Je sais pas si le IdUser est déja dans le cache
        // updateAchievedMission()
        setMessage("Compte créé avec succès ! Redirection...");
        setTimeout(() => {
          window.location.href = "/profil";
        }, 1500);
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
          S&apos;inscrire
        </h1>

        <form onSubmit={onSubmit} className="space-y-3 max-w-md w-full">
          {message && (
            <div className="bg-green-500 text-white p-4 rounded-lg text-center text-xl">
              {message}
            </div>
          )}
          {error && (
            <div className="bg-red-500 text-white p-4 rounded-lg text-center text-xl">
              {error}
            </div>
          )}
          <input
            className="text-2xl border p-4 w-full bg-white rounded-lg"
            type="text"
            placeholder="Pseudo"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            required
          />
          <input
            className="text-2xl border p-4 w-full bg-white rounded-lg"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="text-2xl border p-4 w-full bg-white rounded-lg"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select
            className="text-2xl border p-4 w-full bg-white rounded-lg"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(parseInt(e.target.value))}
          >
            <option value={0}>Sélectionner un pays</option>
            {countries.map((country) => (
              <option key={country.id_country} value={country.id_country}>
                {country.name}
              </option>
            ))}
          </select>
          <div className="text-center">
            <span className="text-white text-xl">Déjà un compte ? </span>
            <a className="text-blue-600 text-xl" href="/sign-in">
              Connectez-vous
            </a>
          </div>

          <button
            type="submit"
            className="text-2xl border p-4 w-full bg-white rounded-lg mt-4"
          >
            S&apos;inscrire
          </button>
        </form>
      </div>
    </div>
  );
}
