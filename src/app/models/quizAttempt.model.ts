import { IdQuiz, IdQuizAttempt, IdUser } from "../types/custom.types"


export type QuizAttempt = {
    idQuizAttempt: IdQuizAttempt
    score: number
    passed: boolean
    startedAt: Date
    completedAt: Date
    idQuiz: IdQuiz
    idUser: IdUser
}