"use client"
import { IdCosmetic } from "@/app/backend/types/custom.types"
import { Cosmetic, CosmeticType } from "@/app/models/cosmetic.model"
import createCosmetic from "@/app/requests/admin/cosmetic/createCosmetic"
import deleteCosmetic from "@/app/requests/admin/cosmetic/deleteCosmetic"
import updateCosmetic from "@/app/requests/admin/cosmetic/updateCosmetic"
import getCosmetic from "@/app/requests/user/cosmetic/getCosmetic"
import getCosmetics from "@/app/requests/user/cosmetic/getCosmetics"
import { useEffect, useState } from "react"


export default function CosmeticPage() {

    const [error, setError] = useState('')

    const [type, setType] = useState<CosmeticType>('AVATAR')
    const [isActive, setIsActive] = useState(false)
    const [price, setPrice] = useState(0)
    const [name, setName] = useState('')
    const [image, setImage] = useState('')

    const [cosmeticSelected, setCosmeticSelected] = useState<Cosmetic | null>(null)
    const [cosmetics, setCosmetics] = useState<Cosmetic[]>([])

    const loadCosmetics = async () => {
        setError('')

        const res = await getCosmetics()
        if (res) {
            setCosmetics(res)
        } else {
            setError('Erreur chargement cosmetics')
        }
    }

    const loadCosmeticSelected = async () => {
        setError('')
        const idCosmetic = new URL(document.URL).searchParams.get('idCosmetic')
        if (idCosmetic) {
            const res = await getCosmetic(parseInt(idCosmetic) as IdCosmetic)
            if (res) {
                setCosmeticSelected(res)
            } else {
                setError('Erreur lors du chargement du cosmetic')
            }
        }
    }

    useEffect(() => {
        loadCosmetics()
        loadCosmeticSelected()
    }, [])

    useEffect(() => {
        if (cosmeticSelected) {
            setPrice(cosmeticSelected.price)
            setName(cosmeticSelected.name)
            setImage(cosmeticSelected.image)
            setIsActive(cosmeticSelected.isActive)
            setType(cosmeticSelected.type)
        }
    }, [cosmeticSelected])

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (price && name && image) {
            const data = {
                price,
                name,
                image,
                isActive,
                type
            }

            const res = await createCosmetic(data)

            if (res.ok) {
                loadCosmetics()

                setImage('')
                setName('')
                setPrice(0)
                setIsActive(false)
            } else {
                setError('Erreur lors de la creation du cosmetic')
            }
        } else {
            setError('Verifier les champs')
        }
    }

    const handleDelete = async (idCosmetic: IdCosmetic) => {
        const res = await deleteCosmetic({ idCosmetic })
        if (res.ok) {
            loadCosmetics()
        } else {
            setError('Erreur lors de la suppression du cosmetic')
        }
    }

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        if (name && price && image && cosmeticSelected) {
            const data = {
                name,
                price,
                image,
                type,
                isActive,
                idCosmetic: cosmeticSelected.idCosmetic
            }

            const res = await updateCosmetic(data)
            if (res) {
                loadCosmetics()
                document.location.href = '/admin/cosmetic'
            } else {
                setError('Erreur update cosmetic')
            }
        } else {
            setError('Verifier les champs')
        }
    }

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow space-y-8">
            {/* Message d'erreur */}
            {error && (
                <p className="text-red-500 text-lg font-medium text-center">{error}</p>
            )}

            {/* Formulaire création / mise à jour */}
            <div className="space-y-4 border-b border-gray-200 pb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                    {cosmeticSelected ? "Update Cosmetic" : "Create Cosmetic"}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 w-full"
                    />

                    <input
                        type="text"
                        placeholder="Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 w-full"
                    />

                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(parseInt(e.target.value))}
                        className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 w-full"
                    />

                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value as CosmeticType)}
                        className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 w-full"
                    >
                        <option value="AVATAR">Avatar</option>
                        <option value="BANNER">Banner</option>
                    </select>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-gray-700 font-medium">Active</span>
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    {cosmeticSelected && (
                        <button
                            onClick={handleUpdate}
                            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Update
                        </button>
                    )}
                    {!cosmeticSelected && (
                        <button
                            onClick={handleCreate}
                            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                            Create
                        </button>
                    )}
                </div>
            </div>

            {/* Liste des cosmetics */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">All Cosmetics</h3>

                {cosmetics.length === 0 && (
                    <p className="text-gray-500 text-center">No cosmetics available.</p>
                )}

                {cosmetics.map((c) => (
                    <div
                        key={c.idCosmetic}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 transition"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={`/cosmetic/${c.image}`}
                                alt={c.name}
                                className="w-16 h-16 rounded-lg object-cover border"
                            />
                            <div>
                                <p className="font-semibold text-gray-800">{c.name}</p>
                                <p className="text-gray-500 text-sm">{c.type}</p>
                                <p className="text-gray-700 text-sm">{c.price} coins</p>
                                <p
                                    className={`text-sm font-medium ${
                                        c.isActive ? "text-green-600" : "text-red-500"
                                    }`}
                                >
                                    {c.isActive ? "Active" : "Inactive"}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() =>
                                    (window.location.href = `/admin/cosmetic?idCosmetic=${c.idCosmetic}`)
                                }
                                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(c.idCosmetic)}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}