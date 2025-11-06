import { IdCourse, IdQuiz } from "../types/custom.types"


export type Quiz = {
    idQuiz: IdQuiz
    difficulty: number
    timeLimit: number
    idCourse: IdCourse | null
}