"use client"

import React, { useState } from "react"
import createMission from "@/app/requests/admin/mission/createMission"
import deleteMission from "@/app/requests/admin/mission/deleteMission"
import { IdCourse } from "@/app/types/custom.types"

export default function MissionsPage() {
  
	const [title, setTitle] = useState("")
	const [content, setContent] = useState("")
	const [rewardCoins, setRewardCoins] = useState(0)
	const [rewardXp, setRewardXp] = useState(0)
	const [targetType, setTargetType] = useState("")
	const [idBadge, setIdBadge] = useState<number | undefined>(undefined)
	const [idCourse, setIdCourse] = useState<number | undefined>(undefined)
	const [idMissionDeleted, setIdMissionDeleted] = useState<number | undefined>(undefined)
	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")

	const createMissionSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError("")
		setSuccess("")

		if (title && content && rewardCoins && rewardXp && targetType && idCourse) {
			const data = {
				title,
				content,
				rewardCoins,
				rewardXp,
				targetType,
				idBadge,
				idCourse: idCourse as IdCourse,
			}

			const res = await createMission(data)
			if (!res.ok) {
				setError("❌ Erreur lors de la création de la mission")
			} else {
				setSuccess("✅ Mission créée avec succès")
				setTitle("")
				setContent("")
				setRewardCoins(0)
				setRewardXp(0)
				setTargetType("")
				setIdBadge(undefined)
				setIdCourse(undefined)
			}
		} else {
			setError("⚠️ Veuillez compléter tous les champs obligatoires")
		}
	}

	const deletMissionSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError("")
		setSuccess("")

		if (idMissionDeleted) {
			const res = await deleteMission({ idMission: idMissionDeleted })
			if (!res.ok) {
				setError("❌ Erreur lors de la suppression de la mission")
			} else {
				setSuccess("✅ Mission supprimée avec succès")
				setIdMissionDeleted(undefined)
			}
		} else {
			setError("⚠️ Veuillez entrer un idMission à supprimer")
		}
	}

	return (
		<div className="min-h-screen bg-gray-100 py-10 px-4">
			<div className="max-w-3xl mx-auto">
				<h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Gestion des Missions</h1>

				{/* Messages */}
				{error && <p className="text-red-600 text-center mb-4 font-semibold">{error}</p>}
				{success && <p className="text-green-600 text-center mb-4 font-semibold">{success}</p>}

				{/* FORMULAIRE DE CRÉATION */}
				<div className="bg-white shadow-lg rounded-2xl p-6 mb-10 border border-gray-200">
					<h2 className="text-xl font-semibold mb-4 text-gray-700">Créer une mission</h2>

					<form onSubmit={createMissionSubmit} className="grid grid-cols-1 gap-4">
						<input
							type="text"
							value={title}
							placeholder="Titre"
							onChange={(e) => setTitle(e.target.value)}
							className="p-2 border rounded-lg w-full focus:ring focus:ring-blue-200"
						/>
						<input
							type="text"
							value={content}
							placeholder="Contenu"
							onChange={(e) => setContent(e.target.value)}
							className="p-2 border rounded-lg w-full focus:ring focus:ring-blue-200"
						/>
						<input
							type="text"
							value={targetType}
							placeholder="Type de cible"
							onChange={(e) => setTargetType(e.target.value)}
							className="p-2 border rounded-lg w-full focus:ring focus:ring-blue-200"
						/>

						<input
							type="number"
							value={idBadge ?? ""}
							placeholder="ID Badge (optionnel)"
							onChange={(e) => setIdBadge(parseInt(e.target.value))}
							className="p-2 border rounded-lg w-full focus:ring focus:ring-blue-200"
						/>

						<div className="grid grid-cols-2 gap-4">
							<input
								type="number"
								value={rewardCoins}
								placeholder="Récompense (Coins)"
								onChange={(e) => setRewardCoins(parseInt(e.target.value))}
								className="p-2 border rounded-lg w-full focus:ring focus:ring-blue-200"
							/>
							<input
								type="number"
								value={rewardXp}
								placeholder="Récompense (XP)"
								onChange={(e) => setRewardXp(parseInt(e.target.value))}
								className="p-2 border rounded-lg w-full focus:ring focus:ring-blue-200"
							/>
						</div>

						<input
							type="number"
							value={idCourse ?? ""}
							placeholder="ID Cours"
							onChange={(e) => setIdCourse(parseInt(e.target.value))}
							className="p-2 border rounded-lg w-full focus:ring focus:ring-blue-200"
						/>

						<button
							type="submit"
							className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
						>
							Créer la mission
						</button>
					</form>
				</div>

				{/* FORMULAIRE DE SUPPRESSION */}
				<div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
					<h2 className="text-xl font-semibold mb-4 text-gray-700">Supprimer une mission</h2>

					<form onSubmit={deletMissionSubmit} className="flex flex-col sm:flex-row gap-4 items-center">
						<input
							type="number"
							value={idMissionDeleted ?? ""}
							placeholder="ID de la mission à supprimer"
							onChange={(e) => setIdMissionDeleted(parseInt(e.target.value))}
							className="p-2 border rounded-lg flex-1 focus:ring focus:ring-red-200"
						/>

						<button
							type="submit"
							className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition font-semibold"
						>
							Supprimer
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}
