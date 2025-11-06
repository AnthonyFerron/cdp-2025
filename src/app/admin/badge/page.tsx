"use client"
import { Badge } from "@/app/models/badge.model";
import createBadge from "@/app/requests/admin/badge/createBadge";
import deleteBadge from "@/app/requests/admin/badge/deleteBadge";
import updateBadge from "@/app/requests/admin/badge/updateBadge";
import getBadge from "@/app/requests/user/badge/getBadge";
import getBadges from "@/app/requests/user/badge/getBadges";
import { IdBadge } from "@/app/types/custom.types";
import { useEffect, useState } from "react";


export default function BadgePage() {

    const [error, setError] = useState('')

    const [icon, setIcon] = useState('')
    const [name, setName] = useState('')

    const [badgeSelected, setBadgeSelected] = useState<Badge | null>(null)
    const [badges, setBadges] = useState<Badge[]>([])

    const loadBadges = async () => {
        setError('')
        const res = await getBadges()
        if (res) {
            setBadges(res)
        } else {
            setError('Erreur chargements badges')
        }
    }

    const loadBadge = async () => {
        const idBadge = new URL(document.URL).searchParams.get('idBadge')
        if (idBadge) {
            const res = await getBadge(parseInt(idBadge) as IdBadge)
            if (res) {
                setBadgeSelected(res)
            } else {
                setError('Erreur chargement du badge')
            }
        }
    }

    useEffect(() => {
        loadBadges()
        loadBadge()
    }, [])

    useEffect(() => {
        if (badgeSelected) {
            setIcon(badgeSelected.icon)
            setName(badgeSelected.name)
        }
    }, [badgeSelected])

    const handleDeleteBadge = async (idBadge: IdBadge) => {
        setError('')

        const res = await deleteBadge({ idBadge })
        if (res.ok) {
            loadBadges()
        } else {
            setError('Erreur suppression badge')
        }
    }

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (name && icon) {
            const data = {
                name,
                icon
            }

            const res = await createBadge(data)
            if (res.ok) {
                loadBadges()

                setIcon('')
                setName('')
            } else {
                setError('Erreur creation de badge')
            }
        } else {
            setError('Verifier les champs')
        }
    }

    const handleUpdate = async () => {
        setError('')

        if (name && icon && badgeSelected) {
            const data = {
                name,
                icon,
                idBadge: badgeSelected.idBadge
            }

            const res = await updateBadge(data)
            if (res.ok) {
                loadBadges()

                document.location.href = '/admin/badge'
            } else {
                setError('Erreur update badge')
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
                    {badgeSelected ? "Update Badge" : "Create Badge"}
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
                        placeholder="Icon URL"
                        value={icon}
                        onChange={(e) => setIcon(e.target.value)}
                        className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 w-full"
                    />
                </div>

                {/* Aperçu de l’icône */}
                {icon && (
                    <div className="flex justify-center mt-4">
                        <img
                            src={icon}
                            alt={name || "Badge icon"}
                            className="w-24 h-24 object-contain rounded-lg border shadow-sm"
                        />
                    </div>
                )}

                <div className="flex justify-end gap-3 mt-4">
                    {badgeSelected ? (
                        <button
                            onClick={handleUpdate}
                            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Update
                        </button>
                    ) : (
                        <button
                            onClick={handleCreate}
                            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                            Create
                        </button>
                    )}
                </div>
            </div>

            {/* Liste des badges */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">All Badges</h3>

                {badges.length === 0 && (
                    <p className="text-gray-500 text-center">No badges available.</p>
                )}

                {badges.map((b) => (
                    <div
                        key={b.idBadge}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 transition"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={b.icon}
                                alt={b.name}
                                className="w-16 h-16 rounded-lg object-contain border"
                            />
                            <div>
                                <p className="font-semibold text-gray-800">{b.name}</p>
                                <p className="text-gray-500 text-sm">ID: {b.idBadge}</p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() =>
                                    (window.location.href = `/admin/badge?idBadge=${b.idBadge}`)
                                }
                                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteBadge(b.idBadge)}
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