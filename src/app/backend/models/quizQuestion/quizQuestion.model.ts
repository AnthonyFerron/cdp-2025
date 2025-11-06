import { IdQuiz, IdQuizQuestion } from "../../types/custom.types"


export type QuizQuestionDb = {
    id_quiz_question: number
    question: string
    choices: string
    answer: string
    id_quiz: number
}

export type QuizQuestion = {
    idQuizQuestion: IdQuizQuestion
    question: string
    choices: string[]
    answer: number[]
    idQuiz: IdQuiz
}

export type QuizQuestionCreateDto = {
    question?: unknown
    choices?: unknown
    answer?: unknown
    idQuiz?: unknown
}

export type QuizQuestionUpdateDto = {
    question?: unknown
    choices?: unknown
    answer?: unknown
    idQuiz?: unknown
    idQuizQuestion?: unknown
}

export type QuizQuestionDeleteDto = {
    idQuizQuestion?: unknown
}