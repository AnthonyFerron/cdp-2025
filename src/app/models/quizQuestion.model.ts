import { IdQuiz, IdQuizQuestion } from "../types/custom.types"


export type QuizQuestion = {
    idQuizQuestion: IdQuizQuestion
    question: string
    choices: string[]
    answer: number[]
    idQuiz: IdQuiz
}