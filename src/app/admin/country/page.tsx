"use client";

import React, { useState, useEffect } from "react";
import {
  getCountries,
  createCountry,
  updateCountry,
  deleteCountry,
} from "./controler";
import { Country } from "./type";

export default function Page() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [countryToDelete, setCountryToDelete] = useState<number | null>(null);
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    getCountries().then(setCountries);
  }, []);

  function openCreate() {
    setName("");
    setImage("");
    setShowCreate(true);
  }

  function openEdit(country: Country) {
    setEditingCountry(country);
    setName(country.name);
    setImage(country.image);
    setShowEdit(true);
  }

  async function handleAddCountry(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !image.trim()) return;

    const newCountry: Omit<Country, "id_country"> = {
      name: name.trim(),
      image: image.trim(),
    };

    const createdCountry = await createCountry(newCountry as Country);

    setCountries([...countries, createdCountry]);

    setShowCreate(false);
  }

  async function handleUpdateCountry(e: React.FormEvent) {
    e.preventDefault();
    if (!editingCountry || !name.trim() || !image.trim()) return;

    const updatedCountryData: Country = {
      id_country: editingCountry.id_country,
      name: name.trim(),
      image: image.trim(),
    };

    await updateCountry(editingCountry.id_country, updatedCountryData);

    // Mise à jour en local state
    setCountries(
      countries.map((c) =>
        c.id_country === editingCountry.id_country ? updatedCountryData : c
      )
    );

    setShowEdit(false);
    setEditingCountry(null);
  }

  async function handleDeleteCountry(id: number) {
    setCountryToDelete(id);
    setShowDeleteConfirm(true);
  }

  async function confirmDelete() {
    if (countryToDelete === null) return;

    await deleteCountry(countryToDelete);

    // Mise à jour en local state
    setCountries(countries.filter((c) => c.id_country !== countryToDelete));

    setShowDeleteConfirm(false);
    setCountryToDelete(null);
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
        <h1 style={{ margin: 0 }}>Administration — Pays</h1>
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
          + Créer un pays
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
                Image
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
            {countries.map((c) => (
              <tr key={c.id_country}>
                <td style={{ padding: 8, borderBottom: "1px solid #f3f4f6" }}>
                  {c.id_country}
                </td>
                <td style={{ padding: 8, borderBottom: "1px solid #f3f4f6" }}>
                  {c.name}
                </td>
                <td style={{ padding: 8, borderBottom: "1px solid #f3f4f6" }}>
                  {c.image}
                </td>
                <td style={{ padding: 8, borderBottom: "1px solid #f3f4f6" }}>
                  <button
                    onClick={() => openEdit(c)}
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
                    onClick={() => handleDeleteCountry(c.id_country)}
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
            {countries.length === 0 && (
              <tr>
                <td colSpan={3} style={{ padding: 8, textAlign: "center" }}>
                  Aucun pays
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
            onSubmit={handleAddCountry}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              padding: 20,
              borderRadius: 8,
              width: 400,
            }}
          >
            <h2 style={{ marginTop: 0 }}>Créer un pays</h2>

            <label style={{ display: "block", marginBottom: 12 }}>
              Nom du pays
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: "100%", padding: 8, marginTop: 6 }}
                placeholder="Ex: France"
                required
              />
            </label>

            <label style={{ display: "block", marginBottom: 12 }}>
              Image (nom du fichier)
              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                style={{ width: "100%", padding: 8, marginTop: 6 }}
                placeholder="Ex: france.png"
                required
              />
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

      {showEdit && editingCountry && (
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
          onClick={() => setShowEdit(false)}
        >
          <form
            onSubmit={handleUpdateCountry}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              padding: 20,
              borderRadius: 8,
              width: 400,
            }}
          >
            <h2 style={{ marginTop: 0 }}>Modifier le pays</h2>

            <label style={{ display: "block", marginBottom: 12 }}>
              Nom du pays
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: "100%", padding: 8, marginTop: 6 }}
                placeholder="Ex: France"
                required
              />
            </label>

            <label style={{ display: "block", marginBottom: 12 }}>
              Image (nom du fichier)
              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                style={{ width: "100%", padding: 8, marginTop: 6 }}
                placeholder="Ex: france.png"
                required
              />
            </label>

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
                  background: "#f59e0b",
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
              Êtes-vous sûr de vouloir supprimer ce pays ? Cette action est
              irréversible.
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
