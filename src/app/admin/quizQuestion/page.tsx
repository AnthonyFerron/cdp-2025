"use client"
import { QuizQuestion } from "@/app/models/quizQuestion.model"
import createQuizQuestion from "@/app/requests/admin/quizQuestion/createQuizQuestion"
import deleteQuizQuestion from "@/app/requests/admin/quizQuestion/deleteQuizQuestion"
import updateQuizQuestion from "@/app/requests/admin/quizQuestion/updateQuizQuestion"
import getQuizQuestions from "@/app/requests/user/quizQuestion/getQuizQuestions"
import { IdQuiz, IdQuizQuestion } from "@/app/types/custom.types"
import { useEffect, useState } from "react"


export default function QuizQuestionPage() {
    const [error, setError] = useState('')

    const [question, setQuestion] = useState('')
    const [choices, setChoices] = useState<string[]>(['', '', '', ''])
    const [answer, setAnswer] = useState<number[]>([])

    const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([])

    const loadQuizQuestions = async () => {
        setError('')
        const idQuiz = new URL(document.URL).searchParams.get('idQuiz')

        if (idQuiz) {
            const res = await getQuizQuestions(parseInt(idQuiz) as IdQuiz, true)

            if (res) {
                setQuizQuestions(res)
            } else {
                setError('Erreur chargement des questions')
            }
        } else {
            setError('Erreur idQuiz introuvable')
        }
    }

    useEffect(() => {
        loadQuizQuestions()
    }, [])
    
    const handleDeleteQuestion = async (idQuizQuestion: IdQuizQuestion) => {
        setError('')

        const res = await deleteQuizQuestion({ idQuizQuestion })
        if (res.ok) {
            loadQuizQuestions()
        } else {
            setError('Erreur suppression de la question')
        }
    }

    const handleUpdateQuestion = async (idQuizQuestion: IdQuizQuestion) => {
        setError('')
        const idQuiz = new URL(document.URL).searchParams.get('idQuiz')
        if (idQuiz) {
            const q = quizQuestions.find(q => q.idQuizQuestion === idQuizQuestion)
            if (!q) return

            const data = {
                question: q.question,
                choices: q.choices,
                answer: q.answer,
                idQuizQuestion,
                idQuiz: parseInt(idQuiz) as IdQuiz
            }

            const res = await updateQuizQuestion(data)
            if (res.ok) {
                loadQuizQuestions()
            } else {
                setError('Erreur update de la question')
            }
        }
    }

    const handleEditQuestion = (value: string, idQuizQuestion: IdQuizQuestion) => {
        setQuizQuestions(prev =>
            prev.map(p =>
                p.idQuizQuestion === idQuizQuestion
                    ? { ...p, question: value }
                    : p
            )
        )
    }

    const handleEditAnswer = (value: number, idQuizQuestion: IdQuizQuestion) => {
        setQuizQuestions(prev =>
            prev.map(p => {
                if (p.idQuizQuestion === idQuizQuestion) {
                    return {
                        ...p,
                        answer: p.answer.includes(value)
                            ? p.answer.filter(a => a !== value)
                            : [...p.answer, value],
                    }
                }
                return p
            })
        )
    }

    const handleEditChoices = (value: string, index: number, idQuizQuestion: IdQuizQuestion) => {
        setQuizQuestions(prev =>
            prev.map(p => {
                if (p.idQuizQuestion === idQuizQuestion) {
                    const updatedChoices = [...p.choices]
                    updatedChoices[index] = value
                    return { ...p, choices: updatedChoices }
                }
                return p
            })
        )
    }

    const handleCreateQuizQuestion = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        const idQuiz = new URL(document.URL).searchParams.get('idQuiz')

        if (question && choices.every(c => c.trim() !== '') && answer.length >= 1 && idQuiz) {
            const data = {
                question,
                choices,
                answer,
                idQuiz: parseInt(idQuiz) as IdQuiz
            }

            const res = await createQuizQuestion(data)
            if (res.ok) {
                loadQuizQuestions()
                setAnswer([])
                setChoices(['', '', '', ''])
                setQuestion('')
            } else {
                setError('Erreur lors de la création de la question')
            }
        } else {
            setError('Veuillez remplir tous les champs et cocher au moins une bonne réponse')
        }
    }

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-8 bg-white shadow rounded-2xl">
            {error && <p className="text-red-500 text-lg font-medium">{error}</p>}

            {/* Liste des questions existantes */}
            {quizQuestions.map((q) => (
                <div
                    key={q.idQuizQuestion}
                    className="p-4 border border-gray-200 rounded-xl bg-gray-50 shadow-sm space-y-4"
                >
                    <h2 className="text-lg font-semibold text-gray-800">
                        Question #{q.idQuizQuestion}
                    </h2>

                    {/* Édition question */}
                    <input
                        type="text"
                        placeholder="Question"
                        className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                        value={q.question}
                        onChange={(e) => handleEditQuestion(e.target.value, q.idQuizQuestion)}
                    />

                    {/* Édition des choix */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {q.choices.map((choice, i) => (
                            <div key={i} className={`flex items-center gap-2 p-2 rounded-lg ${q.answer.includes(i) ? 'bg-green-100' : ''}`}>
                                <input
                                    type="checkbox"
                                    checked={q.answer.includes(i)}
                                    onChange={() => handleEditAnswer(i, q.idQuizQuestion)}
                                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <input
                                    type="text"
                                    placeholder={`Réponse ${i + 1}`}
                                    className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                                    value={choice}
                                    onChange={(e) =>
                                        handleEditChoices(e.target.value, i, q.idQuizQuestion)
                                    }
                                />
                            </div>
                        ))}
                    </div>

                    {/* Boutons */}
                    <div className="flex gap-3 justify-end">
                        <button
                            onClick={() => handleUpdateQuestion(q.idQuizQuestion)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Update
                        </button>
                        <button
                            onClick={() => handleDeleteQuestion(q.idQuizQuestion)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}

            {/* Création nouvelle question */}
            <form
                onSubmit={handleCreateQuizQuestion}
                className="space-y-4 border-t pt-6 mt-6 border-gray-200"
            >
                <h3 className="text-lg font-semibold text-gray-800">Ajouter une nouvelle question</h3>

                <input
                    type="text"
                    placeholder="Intitulé de la question"
                    className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {choices.map((choice, i) => (
                        <div key={i} className={`flex items-center gap-2 p-2 rounded-lg ${answer.includes(i) ? 'bg-green-100' : ''}`}>
                            <input
                                type="checkbox"
                                checked={answer.includes(i)}
                                onChange={() =>
                                    setAnswer(prev =>
                                        prev.includes(i)
                                            ? prev.filter(a => a !== i)
                                            : [...prev, i]
                                    )
                                }
                                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                placeholder={`Réponse ${i + 1}`}
                                className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                                value={choice}
                                onChange={(e) => {
                                    const updated = [...choices]
                                    updated[i] = e.target.value
                                    setChoices(updated)
                                }}
                            />
                        </div>
                    ))}
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                        Créer la question
                    </button>
                </div>
            </form>
        </div>
    )
}
