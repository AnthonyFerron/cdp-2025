"use client"
import { useEffect, useState } from "react"
import { QuizQuestion } from "../models/quizQuestion.model"
import getQuizQuestions from "../requests/user/quizQuestion/getQuizQuestions"
import { IdQuiz } from "../types/custom.types"
import Header from "../../../composants/header/page"
import getQuizQuestion from "../requests/user/quizQuestion/getQuizQuestion"
import getIdUserLocalStorage from "../helpers/getIdUserLocalStorage"
import createQuizAttempt from "../requests/user/quizAttempt/createQuizAttempt"


export default function QuizPage() {

    const [page, setPage] = useState(0)
    const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([])
    const [progressPercent, setProgressPercent] = useState(0)
    const [choices, setChoices] = useState<number[]>([])
    const [response, setResponse] = useState<QuizQuestion | null>(null)
    const [startedAt, setStartedAt] = useState(new Date())
    const [correctAnswer, setCorrectAnswer] = useState(0)

    useEffect(() => {
        if (quizQuestions.length > 0) {
            setProgressPercent(Math.round((page / quizQuestions.length) * 100))
            setResponse(null)
            setChoices([])
        }

        if (page === quizQuestions.length && quizQuestions.length !== 0) {
            createQuizAttemptFinished()
        }
    }, [page, quizQuestions])

    const loadQuizQuestions = async () => {
        const idQuiz = new URL(document.URL).searchParams.get("idQuiz")

        if (idQuiz) {
            const res = await getQuizQuestions(parseInt(idQuiz) as IdQuiz, false)
            if (res) setQuizQuestions(res)
        }
    }

    const getResponse = async () => {
        if (quizQuestions[page]) {
            const res = await getQuizQuestion(quizQuestions[page].idQuizQuestion, true)
            if (res) {
                setResponse(res)
                if (res.answer[0] === choices[0]) {
                    setCorrectAnswer(prev => prev + 1)
                }
            }
        }
    }
    
    const createQuizAttemptFinished = async () => {
        const idQuiz = new URL(document.URL).searchParams.get("idQuiz")
        const idUser = getIdUserLocalStorage()

        if (idQuiz && idUser) {
            const data = {
                passed: (correctAnswer / quizQuestions.length ) * 100 >= 75,
                score: correctAnswer,
                startedAt,
                idQuiz: parseInt(idQuiz) as IdQuiz,
                idUser
            }

            await createQuizAttempt(data)
        }
    }

    useEffect(() => {
        loadQuizQuestions()
    }, [])

    const handleChoices = async (choice: number) => {
        setChoices([choice])
    }

    useEffect(() => {
        if (choices.length !== 0) {
            getResponse()
        }
    }, [choices])

    return (
        <div className="bg-[#1D1D1D] min-h-screen font-[silkscreen] text-white">
            <Header />

            <div className="w-[85%] mx-auto text-center mt-20 mb-4 py-10 flex flex-col gap-20">
                <div className="bg-[#faf2ea] text-black rounded-md p-4">
                    {page < quizQuestions.length ? (
                        <>
                            <h3 className="text-2xl">
                                Question {page + 1} / {quizQuestions.length}
                            </h3>
                            <p className="text-xl">{quizQuestions[page].question}</p>
                        </>
                    ) : (
                        <>
                            <h3 className="text-2xl">Récapitulatif</h3>
                            <p className="text-xl">Fin du quiz 🎉</p>
                        </>
                    )}
                </div>

                {page < quizQuestions.length && (
                    <div className="grid grid-cols-2 gap-5 my-4">
                        {quizQuestions[page].choices.map((opt, i) => {
                            // Couleur du bouton selon réponse
                            let buttonColor = "bg-[#DADCE7] border-[#FFFFFF] text-black"

                            if (response) {
                                if (response.answer.includes(i)) {
                                    buttonColor = "bg-green-500 border-green-900 text-white"
                                } else if (choices.includes(i) && !response.answer.includes(i)) {
                                    buttonColor = "bg-red-500 border-red-900 text-white"
                                }
                            }

                            return (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => !response && handleChoices(i)}
                                    disabled={!!response}
                                    className={`w-full mx-auto h-16 flex items-center justify-center text-2xl outline-[#989AAF] outline-2 border-2 rounded shadow-[0px_2px_0px_2px_#666880] hover:shadow-none hover:mt-0.5 whitespace-nowrap overflow-hidden transition-all ${buttonColor}`}
                                >
                                    {opt}
                                </button>
                            )
                        })}
                    </div>
                )}

                {response && page < quizQuestions.length && (
                    <button
                        onClick={() => setPage(prev => prev + 1)}
                        className="mx-auto mt-4 px-6 py-2 text-2xl border-2 border-[#FFFFFF] rounded bg-[#DADCE7] text-black shadow-[0px_2px_0px_2px_#666880] hover:shadow-none hover:mt-0.5 transition-all"
                    >
                        Prochaine question
                    </button>
                )}

                {/* ProgressBar */}
                <div className="w-full bg-gray-700 rounded-xl h-4 overflow-hidden mt-8 mb-2">
                    <div
                        className="h-full bg-gradient-to-r from-green-400 to-lime-400 transition-all"
                        style={{ width: `${progressPercent}%` }}
                        role="progressbar"
                        aria-valuenow={progressPercent}
                        aria-valuemin={0}
                        aria-valuemax={100}
                    />
                </div>

                <p className="text-white text-xl">{progressPercent}%</p>
            </div>
        </div>
    )
}
