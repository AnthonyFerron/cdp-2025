import { IdCourse, IdQuiz } from "../../types/custom.types"


export type QuizDb = {
    id_quiz: number
    difficulty: number
    time_limit: number
    id_course: number | null
}

export type Quiz = {
    idQuiz: IdQuiz
    difficulty: number
    timeLimit: number
    idCourse: IdCourse | null
}

export type QuizCreateDto = {
    difficulty?: unknown
    timeLimit?: unknown
    idCourse?: unknown
}

export type QuizDeleteDto = {
    idQuiz?: unknown
}

export type QuizUpdateDto = {
    idQuiz?: unknown
    difficulty?: unknown
    timeLimit?: unknown
    idCourse?: unknown
}