"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

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
    <form onSubmit={onSubmit} className="space-y-3 max-w-sm mx-auto mt-10">
      <input
        className="border p-2 w-full"
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="border p-2 w-full">
        Sign up
      </button>
    </form>
  );
}
