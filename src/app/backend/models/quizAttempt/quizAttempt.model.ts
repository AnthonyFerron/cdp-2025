import { IdQuiz, IdQuizAttempt, IdUser } from "../../types/custom.types"


export type QuizAttemptDb = {
    id_quiz_attempt: number
    score: number
    passed: boolean
    started_at: Date
    completed_at: Date
    id_quiz: number
    id_user: string
}

export type QuizAttempt = {
    idQuizAttempt: IdQuizAttempt
    score: number
    passed: boolean
    startedAt: Date
    completedAt: Date
    idQuiz: IdQuiz
    idUser: IdUser
}

export type QuizAttemptCreateDto = {
    score?: unknown
    passed?: unknown
    startedAt?: unknown
    idQuiz?: unknown
    idUser?: unknown
}