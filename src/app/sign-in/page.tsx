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
      // callbackURL: "/dashboard", rememberMe: true (optionnels)
    });
    if (!error) window.location.href = "/dashboard";
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 max-w-sm mx-auto mt-10">
      <input
        className="border p-2 w-full"
        type="email"
        value={email}
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        type="password"
        value={password}
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="border p-2 w-full">
        Sign in
      </button>
    </form>
  );
}
