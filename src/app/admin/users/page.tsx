"use client";

import React, { useState, useEffect } from "react";
import getUsersRequest from "@/app/requests/admin/user/getUsers";
import createUserRequest from "@/app/requests/admin/user/createUser";
import updateUserRequest from "@/app/requests/admin/user/updateUser";
import deleteUserRequest from "@/app/requests/admin/user/deleteUser";
import getCountriesRequest from "@/app/requests/admin/country/getCountries";
import { User } from "./type";
import { Country } from "../country/type";

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [experience, setExperience] = useState(0);
  const [levels, setLevels] = useState(1);
  const [coins, setCoins] = useState(0);
  const [role, setRole] = useState("USER");
  const [idCountry, setIdCountry] = useState<number>(0);

  useEffect(() => {
    getUsersRequest().then((data) => {
      if (data) setUsers(data);
    });
    getCountriesRequest().then((data) => {
      if (data) {
        setCountries(data);
        if (data.length > 0) {
          setIdCountry(data[0].idCountry);
        }
      }
    });
  }, []);

  function openCreate() {
    setName("");
    setEmail("");
    setEmailVerified(false);
    setExperience(0);
    setLevels(1);
    setCoins(0);
    setRole("USER");
    if (countries.length > 0) {
      setIdCountry(countries[0].idCountry);
    }
    setShowCreate(true);
  }

  function openEdit(user: User) {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setEmailVerified(user.emailVerified);
    setExperience(user.experience);
    setLevels(user.levels);
    setCoins(user.coins);
    setRole(user.role);
    setIdCountry(user.idCountry);
    setShowEdit(true);
  }

  async function handleAddUser(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const response = await createUserRequest({
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
      emailVerified: emailVerified,
      experience: experience,
      levels: levels,
      coins: coins,
      role: role,
      idCountry: idCountry,
    });

    if (response.ok) {
      // Recharger la liste des utilisateurs
      const data = await getUsersRequest();
      if (data) setUsers(data);
    }

    setShowCreate(false);
  }

  async function handleUpdateUser(e: React.FormEvent) {
    e.preventDefault();
    if (!editingUser || !name.trim() || !email.trim()) return;

    const updatedUserData: User = {
      ...editingUser,
      name: name.trim(),
      email: email.trim(),
      emailVerified: emailVerified,
      experience: experience,
      levels: levels,
      coins: coins,
      role: role,
      idCountry: idCountry,
      updatedAt: new Date(),
    };

    await updateUserRequest({
      id: editingUser.id,
      name: name.trim(),
      email: email.trim(),
      emailVerified: emailVerified,
      experience: experience,
      levels: levels,
      coins: coins,
      role: role,
      idCountry: idCountry,
    });

    setUsers(users.map((u) => (u.id === editingUser.id ? updatedUserData : u)));

    setShowEdit(false);
    setEditingUser(null);
  }

  async function handleDeleteUser(id: string) {
    setUserToDelete(id);
    setShowDeleteConfirm(true);
  }

  async function confirmDelete() {
    if (!userToDelete) return;

    await deleteUserRequest({ id: userToDelete });

    setUsers(users.filter((u) => u.id !== userToDelete));

    setShowDeleteConfirm(false);
    setUserToDelete(null);
  }

  return (
    <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h1 style={{ margin: 0 }}>Administration — Utilisateurs</h1>
        <button
          onClick={openCreate}
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          + Créer un utilisateur
        </button>
      </header>

      <section>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "left",
                  padding: 8,
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                ID
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: 8,
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                Nom
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: 8,
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                Email
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: 8,
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td style={{ padding: 8, borderBottom: "1px solid #f3f4f6" }}>
                  {u.id}
                </td>
                <td style={{ padding: 8, borderBottom: "1px solid #f3f4f6" }}>
                  {u.name}
                </td>
                <td style={{ padding: 8, borderBottom: "1px solid #f3f4f6" }}>
                  {u.email}
                </td>
                <td style={{ padding: 8, borderBottom: "1px solid #f3f4f6" }}>
                  <button
                    onClick={() => openEdit(u)}
                    style={{
                      backgroundColor: "#f59e0b",
                      color: "white",
                      border: "none",
                      padding: "4px 8px",
                      borderRadius: 4,
                      cursor: "pointer",
                      marginRight: 8,
                    }}
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteUser(u.id)}
                    style={{
                      backgroundColor: "#ef4444",
                      color: "white",
                      border: "none",
                      padding: "4px 8px",
                      borderRadius: 4,
                      cursor: "pointer",
                    }}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: 8 }}>
                  Aucun utilisateur
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {showCreate && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.4)",
          }}
          onClick={() => setShowCreate(false)}
        >
          <form
            onSubmit={handleAddUser}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              padding: 20,
              borderRadius: 8,
              width: 480,
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <h2 style={{ marginTop: 0 }}>Créer un utilisateur</h2>

            <label style={{ display: "block", marginBottom: 8 }}>
              Nom
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: "100%", padding: 8, marginTop: 6 }}
                required
              />
            </label>

            <label style={{ display: "block", marginBottom: 12 }}>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: 8, marginTop: 6 }}
                required
              />
            </label>

            <label style={{ display: "block", marginBottom: 12 }}>
              Rôle
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{ width: "100%", padding: 8, marginTop: 6 }}
              >
                <option value="USER">Utilisateur</option>
                <option value="ADMIN">Administrateur</option>
              </select>
            </label>

            <label style={{ display: "block", marginBottom: 12 }}>
              Expérience (par défaut: 0)
              <input
                type="number"
                value={experience}
                onChange={(e) => setExperience(Number(e.target.value))}
                style={{ width: "100%", padding: 8, marginTop: 6 }}
                min="0"
              />
            </label>

            <label style={{ display: "block", marginBottom: 12 }}>
              Niveau (par défaut: 1)
              <input
                type="number"
                value={levels}
                onChange={(e) => setLevels(Number(e.target.value))}
                style={{ width: "100%", padding: 8, marginTop: 6 }}
                min="1"
              />
            </label>

            <label style={{ display: "block", marginBottom: 12 }}>
              Pièces (par défaut: 0)
              <input
                type="number"
                value={coins}
                onChange={(e) => setCoins(Number(e.target.value))}
                style={{ width: "100%", padding: 8, marginTop: 6 }}
                min="0"
              />
            </label>

            <label style={{ display: "block", marginBottom: 12 }}>
              Pays
              <select
                value={idCountry}
                onChange={(e) => setIdCountry(Number(e.target.value))}
                style={{ width: "100%", padding: 8, marginTop: 6 }}
                required
              >
                <option value="" disabled>
                  Sélectionnez un pays
                </option>
                {countries.map((country) => (
                  <option key={country.idCountry} value={country.idCountry}>
                    {country.name}
                  </option>
                ))}
              </select>
            </label>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 12,
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={emailVerified}
                onChange={(e) => setEmailVerified(e.target.checked)}
                style={{ marginRight: 8 }}
              />
              Email vérifié
            </label>

            <div
              style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}
            >
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                style={{ padding: "8px 12px" }}
              >
                Annuler
              </button>
              <button
                type="submit"
                style={{
                  background: "#059669",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: 6,
                }}
              >
                Créer
              </button>
            </div>
          </form>
        </div>
      )}

      {showEdit && (
        <div
          role="dialog"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowEdit(false)}
        >
          <form
            onSubmit={handleUpdateUser}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              padding: 24,
              borderRadius: 8,
              minWidth: 400,
            }}
          >
            <h2 style={{ marginBottom: 16 }}>Modifier l&apos;utilisateur</h2>

            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", marginBottom: 4 }}>Nom</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: "100%", padding: 8 }}
              />
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", marginBottom: 4 }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: 8 }}
              />
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", marginBottom: 4 }}>Rôle</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{ width: "100%", padding: 8 }}
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", marginBottom: 4 }}>
                Expérience
              </label>
              <input
                type="number"
                value={experience}
                onChange={(e) => setExperience(parseInt(e.target.value))}
                style={{ width: "100%", padding: 8 }}
              />
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", marginBottom: 4 }}>
                Niveau
              </label>
              <input
                type="number"
                value={levels}
                onChange={(e) => setLevels(parseInt(e.target.value))}
                style={{ width: "100%", padding: 8 }}
              />
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", marginBottom: 4 }}>
                Pièces
              </label>
              <input
                type="number"
                value={coins}
                onChange={(e) => setCoins(parseInt(e.target.value))}
                style={{ width: "100%", padding: 8 }}
              />
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", marginBottom: 4 }}>Pays</label>
              <select
                value={idCountry}
                onChange={(e) => setIdCountry(parseInt(e.target.value))}
                style={{ width: "100%", padding: 8 }}
              >
                <option value="">Sélectionner un pays</option>
                {countries.map((c) => (
                  <option key={c.idCountry} value={c.idCountry}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: 12 }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={emailVerified}
                  onChange={(e) => setEmailVerified(e.target.checked)}
                />
                Email vérifié
              </label>
            </div>

            <div
              style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}
            >
              <button
                type="button"
                onClick={() => setShowEdit(false)}
                style={{ padding: "8px 12px" }}
              >
                Annuler
              </button>
              <button
                type="submit"
                style={{
                  background: "#059669",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: 6,
                }}
              >
                Modifier
              </button>
            </div>
          </form>
        </div>
      )}

      {showDeleteConfirm && (
        <div
          role="dialog"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowDeleteConfirm(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              padding: 24,
              borderRadius: 8,
              minWidth: 400,
              maxWidth: 500,
            }}
          >
            <h2 style={{ marginBottom: 16, fontSize: 20 }}>
              Confirmer la suppression
            </h2>
            <p style={{ marginBottom: 24, color: "#6b7280" }}>
              Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action
              est irréversible.
            </p>
            <div
              style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}
            >
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                style={{
                  padding: "8px 16px",
                  border: "1px solid #d1d5db",
                  borderRadius: 6,
                  background: "white",
                  cursor: "pointer",
                }}
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                style={{
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
