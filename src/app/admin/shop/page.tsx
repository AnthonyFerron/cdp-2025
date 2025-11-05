'use client';
import React, {useEffect, useState} from 'react'
import Image from "next/image";
import { Cosmetic } from './types';
import getCosmetics from "./controller";


export default function Page() {

  const [cosmetic, setCosmetic] = useState<Cosmetic[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getCosmetics().then(setCosmetic);
  }, []);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //
  //   const formElement = e.target as HTMLFormElement;
  //   const imageInput = formElement.elements.namedItem('image') as HTMLInputElement | null;
  //
  //   if (!imageInput || !imageInput.files || imageInput.files.length === 0) {
  //     return;
  //   }
  //
  //   const imageFile = imageInput.files[0];
  //
  //   const formData = new FormData();
  //   formData.append("type", form.type);
  //   formData.append("price", String(form.price));
  //   formData.append("is_active", String(form.is_active));
  //   formData.append("image", imageFile);
  //   const res = "";
  //
  //   if (res) setMessage("Cosmetic ajouté !");
  //   else setMessage("Erreur !");
  // };


  return (
    <div className="flex flex-col items-center w-full">
      <table className="border-collapse border border-gray-200">
        <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2 bg-gray-100">ID</th>
          <th className="border border-gray-300 px-4 py-2 bg-gray-100">Name</th>
          <th className="border border-gray-300 px-4 py-2 bg-gray-100">Type</th>
          <th className="border border-gray-300 px-4 py-2 bg-gray-100">Prix (€)</th>
          <th className="border border-gray-300 px-4 py-2 bg-gray-100">Image</th>
          <th className="border border-gray-300 px-4 py-2 bg-gray-100">Actif</th>
        </tr>
        </thead>
        <tbody>
        {cosmetic.map((c: Cosmetic) => (
          <tr key={c.id_cosmetic} className="hover:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">{c.id_cosmetic}</td>
            <td className="border border-gray-300 px-4 py-2">{c.name}</td>
            <td className="border border-gray-300 px-4 py-2">{c.type}</td>
            <td className="border border-gray-300 px-4 py-2">{c.price.toFixed(2)}</td>
            <td className={`border border-gray-300 px-4 py-2 font-semibold ${c.is_active ? 'text-green-600' : 'text-red-600'}`}>
              {c.is_active ? 'Oui' : 'Non'}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      <form className="border border-gray-300 w-fit flex flex-col items-center">
        <label htmlFor="type">Type</label>
        <select name="type" id="type">
          <option value="avatar">Avatar</option>
          <option value="banner">Bannière</option>
        </select>
        <label htmlFor="price">Price</label>
        <input type="number" className="border" id="price"/>
        <label htmlFor="image">Image</label>
        <input type="file" className="border" id="image"/>
        <label htmlFor="is_active">Active</label>
        <input type="checkbox" className="border" id="is_active"/>
        <button type={"submit"} className={"border rounded-full"}>Ajouter une cosmetique</button>
      </form>
    </div>
  )
}
