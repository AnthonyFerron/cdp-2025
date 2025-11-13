"use client"
import { Quiz } from '@/app/models/quiz.model'
import createQuiz from '@/app/requests/admin/quiz/createQuiz'
import deleteQuiz from '@/app/requests/admin/quiz/deleteQuiz'
import updateQuiz from '@/app/requests/admin/quiz/updateQuiz'
import getQuiz from '@/app/requests/user/quiz/getQuiz'
import getQuizs from '@/app/requests/user/quiz/getQuizs'
import { IdCourse, IdQuiz } from '@/app/types/custom.types'
import React, { useEffect, useState } from 'react'


export default function QuizPage() {

	const [error, setError] = useState('')

	const [difficulty, setDifficulty] = useState(0)
	const [timeLimit, setTimeLimit] = useState(0)
	const [idCourse, setIdCourse] = useState<number | null>(null)

	const [quizs, setQuizs] = useState<Quiz[]>([])
	const [quizSelected, setQuizSelected] = useState<Quiz | null>(null)

	const loadQuiz = async () => {
		setError('')
		const idQuiz = new URL(document.URL).searchParams.get('idQuiz')

		if (idQuiz) {
			const response = await getQuiz(parseInt(idQuiz) as IdQuiz)

			if (response) {
				setQuizSelected(response)
			} else {
				setError('Erreur chargement du quiz séléctionné')
			}
		}
	}

	const loadQuizs = async () => {
		setError('')
		const response = await getQuizs()

		if (response) {
			setQuizs(response)
		} else {
			setError('Erreur chargement des quizs')
		}
	}

	useEffect(() => {
		if (quizSelected) {
			setDifficulty(quizSelected.difficulty)
			setIdCourse(quizSelected.idCourse)
			setTimeLimit(quizSelected.timeLimit)
		}
	}, [quizSelected])

	useEffect(() => {
		loadQuiz()
		loadQuizs()
	}, [])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')

		if (difficulty && timeLimit) {
			const data = {
				difficulty,
				idCourse,
				timeLimit
			}

			if (quizSelected) {
				const res = await updateQuiz({
					...data,
					idQuiz: quizSelected.idQuiz,
					idCourse: idCourse as IdCourse
				})

				if (res.ok) {
					loadQuizs()
					document.location.href = `/admin/quiz`
				} else {
					setError('Erreur update quiz')
				}
			} else {
				const res = await createQuiz({
					...data,
					idCourse: idCourse as IdCourse
				})

				if (res.ok) {
					loadQuizs()
				} else {
					setError('Erreur update quiz')
				}
			}
		} else {
			setError('Veuillez vérifier les informations')
		}
	}

	const handleDelete = async (idQuiz: IdQuiz) => {
		setError('')
		const res = await deleteQuiz({ idQuiz })
		if (res.ok) {
			loadQuizs()
		} else {
			setError('Erreur lors de la suppression du quiz')
		}
	}

	return (
		<div className="p-6 max-w-3xl mx-auto bg-white shadow rounded-2xl space-y-8">
			{/* Message d’erreur */}
			{error && (
				<p className="text-red-500 text-lg font-medium">{error}</p>
			)}

			{/* Formulaire */}
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<p>Difficulty</p>
						<input
							type="number"
							placeholder="Difficulty"
							className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
							value={difficulty || 0}
							onChange={(e) => setDifficulty(e.target.value ? parseInt(e.target.value) : 0)}
						/>
					</div>

					<div>
						<p>Time Limit</p>
						<input
							type="number"
							placeholder="Time Limit (minutes)"
							className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
							value={timeLimit || 0}
							onChange={(e) => setTimeLimit(e.target.value ? parseInt(e.target.value) : 0)}
						/>
					</div>

					<div>
						<p>ID Course</p>
						<input
							type="number"
							placeholder="ID Course"
							className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
							value={idCourse || 0}
							onChange={(e) => setIdCourse(e.target.value ? parseInt(e.target.value) : null)}
						/>
					</div>
				</div>

				<div className="flex justify-end">
					<button
						type="submit"
						className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
					>
						{quizSelected ? 'Update' : 'Create'}
					</button>
				</div>
			</form>

			{/* Liste des quiz */}
			<div className="border-t border-gray-200 pt-6 space-y-4">
				{quizs.map((quiz) => (
					<div
						key={quiz.idQuiz}
						className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition"
					>
						<div>
							<p className="text-gray-800 font-medium">Quiz #{quiz.idQuiz}</p>
							<p className="text-sm text-gray-500">
								Difficulty: {quiz.difficulty} | Time Limit: {quiz.timeLimit} min | Course ID: {quiz.idCourse}
							</p>
						</div>

						<div className="flex gap-3">
							<button
								onClick={() => (document.location.href = `/admin/quiz?idQuiz=${quiz.idQuiz}`)}
								className="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
							>
								Edit
							</button>
							<button
								onClick={() => (document.location.href = `/admin/quizQuestion?idQuiz=${quiz.idQuiz}`)}
								className="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
							>
								Edit Questions
							</button>
							<button
								onClick={() => handleDelete(quiz.idQuiz)}
								className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
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
