import getAdminUrl from "@/app/helpers/getAdminUrl"
import { IdQuiz } from "@/app/types/custom.types"


const adminUrl = getAdminUrl()

type Params = {
    question: string
    choices: string[]
    answer: number[]
    idQuiz: IdQuiz
}

export default async function createQuizQuestion(data: Params) {
    return await fetch(`${adminUrl}quizQuestion`, {
        body: JSON.stringify(data),
        method: 'POST'
    })
}